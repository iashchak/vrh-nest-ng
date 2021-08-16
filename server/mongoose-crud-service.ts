import { CrudRequest, CreateManyDto, CrudService } from '@nestjsx/crud';
import { FindManyOptions, MongoRepository } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

export class MongooseCrudService<T> extends CrudService<T> {
  constructor(protected readonly repo: MongoRepository<T>) {
    super();
  }

  recoverOne(req: CrudRequest): Promise<void | T> {
    throw new Error('Method not implemented.');
  }

  buildQuery(
    req: CrudRequest
  ): FindManyOptions<T> & { page: number; id: string } {
    let {
      limit = 10,
      page = 1,
      offset: skip = 0,
      filter = [],
      fields = [],
      sort = [],
      join = [],
      paramsFilter = [],
    } = req.parsed;
    if (page > 1) {
      skip = (page - 1) * limit;
    }
    const where = filter.reduce(
      (acc: Record<string, object | null>, { field, operator, value }) => {
        let cond = null;
        switch (operator) {
          case 'starts':
            cond = new RegExp(`^${value}`, 'i');
            break;
          case 'ends':
            cond = new RegExp(`${value}\$`, 'i');
            break;

          case 'cont':
            cond = new RegExp(`${value}`, 'i');
            break;
          case 'excl':
            cond = { $ne: new RegExp(`${value}`, 'i') };
            break;
          case 'notin':
            cond = { $nin: value };
            break;
          case 'isnull':
            cond = null;
            break;
          case 'notnull':
            cond = { $ne: null };
            break;
          case 'between':
            const [min, max] = value;
            cond = { $gte: min, $lte: max };
            break;
          default:
            cond = { [`\$${operator}`]: value };
        }
        acc[field] = cond;
        return acc;
      },
      {}
    );
    const order: { [P in EntityFieldsNames<T>]?: 1 | -1 } = sort.reduce(
      (acc, { field, order }) => ({
        ...acc,
        [field]: order === 'ASC' ? 1 : -1,
      }),
      {}
    );
    const idParam = paramsFilter.find((v) => v.field === 'id');
    const id = idParam ? idParam.value : null;

    return {
      page,
      skip,
      take: limit,
      order,
      select: fields as Array<keyof T>,
      where,
      relations: join.map((v) => v.field),
      id,
    };
  }

  async getMany(req: CrudRequest) {
    const { page, ...query } = this.buildQuery(req);
    const data = await this.repo.find(query);
    const total = await this.repo.count(query);
    return this.createPageInfo(data, total, query.take || 0, query.skip || 0);
  }

  async getOne(req: CrudRequest): Promise<T> {
    const { id, ...query } = this.buildQuery(req);
    const data = await this.repo.findOne(id, query);
    if (!data) {
      this.throwNotFoundException(this.repo.metadata.name);
      throw new Error('UNREACHABLE');
    }

    return data;
  }
  async createOne(req: CrudRequest | undefined, dto: T): Promise<T> {
    return await this.repo.save(dto);
  }
  async createMany(req: CrudRequest, { bulk }: CreateManyDto<T>): Promise<T[]> {
    await this.repo.insertMany(bulk);
    return bulk;
  }
  async updateOne(req: CrudRequest, dto: T): Promise<T> {
    const { id } = this.buildQuery(req);
    const entity = await this.repo.findOne(id);
    if (!entity) {
      this.throwNotFoundException(this.repo.metadata.name);
      throw new Error('UNREACHABLE');
    }
    Object.assign(entity, dto);
    await this.repo.save(entity);
    return entity;
  }
  async replaceOne(req: CrudRequest, dto: T): Promise<T> {
    const { id } = this.buildQuery(req);
    const data = await this.repo.replaceOne(
      {
        id
      },
      dto
    );
    if (!data) {
      this.throwNotFoundException(this.repo.metadata.name);
      throw new Error('UNREACHABLE');
    }
    return this.repo.findOne(id) as Promise<T>;
  }
  async deleteOne(req: CrudRequest): Promise<void | T> {
    const { id } = this.buildQuery(req);
    await this.repo.findOneAndDelete({ id });
    return;
  }
}
