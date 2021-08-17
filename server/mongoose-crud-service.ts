import { CreateManyDto, CrudRequest, CrudService } from '@nestjsx/crud';
import { MongoRepository } from 'typeorm';

export class MongooseCrudService<T> extends CrudService<T> {
  constructor(protected readonly modelRepository: MongoRepository<T>) {
    super();
  }

  recoverOne(req: CrudRequest): Promise<void | T> {
    throw new Error('Method not implemented.');
  }

  buildQuery(req: CrudRequest) {
    this.modelRepository;
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
    const options = {
      page,
      skip,
      limit,
      take: limit,
      sort: sort.reduce(
        (acc: Record<string, 1 | -1>, v) => (
          (acc[v.field] = v.order === 'ASC' ? 1 : -1), acc
        ),
        {}
      ),
      populate: join.map((v) => v.field),
      select: fields as Array<keyof T>,
    };
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
    const idParam = paramsFilter.find((v) => v.field === 'id');
    return { options, where, id: idParam ? idParam.value : null };
  }

  async getMany(req: CrudRequest) {
    const { options, where } = this.buildQuery(req);
    const data = await this.modelRepository.find({ where, ...options });
    if (options.page) {
      const total = await this.modelRepository.count(where);
      return this.createPageInfo(data, total, options.limit, options.skip);
    }
    return data;
  }

  async getOne(req: CrudRequest): Promise<T> {
    const { options, where, id } = this.buildQuery(req);
    const data = (await this.modelRepository.findOne(id, {
      where,
      ...options,
    })) as T;

    !data &&
      this.throwNotFoundException(this.modelRepository.target.toString());

    return data;
  }
  async createOne(req: CrudRequest, dto: T): Promise<T> {
    return await this.modelRepository.create(dto);
  }
  async createMany(req: CrudRequest, dto: CreateManyDto<T>): Promise<T[]> {
    const { ops } = await this.modelRepository.insertMany(dto.bulk);
    return ops;
  }
  async updateOne(req: CrudRequest, dto: T): Promise<T> {
    const { id } = this.buildQuery(req);
    const data = await this.modelRepository.findOneAndUpdate(id, dto);
    !data &&
      this.throwNotFoundException(this.modelRepository.target.toString());

    return data.value;
  }
  async replaceOne(req: CrudRequest, dto: T): Promise<T> {
    const { id } = this.buildQuery(req);
    const data = await this.modelRepository.replaceOne(
      {
        _id: id,
      },
      dto
    );
    !data &&
      this.throwNotFoundException(this.modelRepository.target.toString());
    return this.modelRepository.findOne(id) as Promise<T>;
  }
  async deleteOne(req: CrudRequest): Promise<void | T> {
    const { id } = this.buildQuery(req);
    const data = await this.modelRepository.findOne(id);
    !data &&
      this.throwNotFoundException(this.modelRepository.target.toString());
    await this.modelRepository.findOneAndDelete(id);
    return data;
  }
}
