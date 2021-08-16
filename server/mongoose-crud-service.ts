import { CreateManyDto, CrudRequest, CrudService } from '@nestjsx/crud';
import { MongoRepository } from 'typeorm';

export class MongooseCrudService<T> extends CrudService<T> {
  constructor(protected readonly modelRepository: MongoRepository<T>) {
    super();
  }

  recoverOne(req: CrudRequest): Promise<void | T> {
    throw new Error('Method not implemented.');
  }

  // buildQuery(
  //   req: CrudRequest
  // ): FindManyOptions<T> & { page: number; id: string } {
  //   let {
  //     limit = 10,
  //     page = 1,
  //     offset: skip = 0,
  //     filter = [],
  //     fields = [],
  //     sort = [],
  //     join = [],
  //     paramsFilter = [],
  //   } = req.parsed;
  //   if (page > 1) {
  //     skip = (page - 1) * limit;
  //   }
  //   const where = filter.reduce(
  //     (acc: Record<string, object | null>, { field, operator, value }) => {
  //       let cond = null;
  //       switch (operator) {
  //         case 'starts':
  //           cond = new RegExp(`^${value}`, 'i');
  //           break;
  //         case 'ends':
  //           cond = new RegExp(`${value}\$`, 'i');
  //           break;

  //         case 'cont':
  //           cond = new RegExp(`${value}`, 'i');
  //           break;
  //         case 'excl':
  //           cond = { $ne: new RegExp(`${value}`, 'i') };
  //           break;
  //         case 'notin':
  //           cond = { $nin: value };
  //           break;
  //         case 'isnull':
  //           cond = null;
  //           break;
  //         case 'notnull':
  //           cond = { $ne: null };
  //           break;
  //         case 'between':
  //           const [min, max] = value;
  //           cond = { $gte: min, $lte: max };
  //           break;
  //         default:
  //           cond = { [`\$${operator}`]: value };
  //       }
  //       acc[field] = cond;
  //       return acc;
  //     },
  //     {}
  //   );
  //   const order = sort.reduce(
  //     (acc, { field, order }) => ({
  //       ...acc,
  //       [field]: order === 'ASC' ? 1 : -1,
  //     }),
  //     {}
  //   );
  //   const idParam = paramsFilter.find((v) => v.field === 'id');
  //   const id = idParam ? idParam.value : null;

  //   return {
  //     page,
  //     skip,
  //     take: limit,
  //     order,
  //     select: fields as Array<keyof T>,
  //     where,
  //     relations: join.map((v) => v.field),
  //     id,
  //   };
  // }

  // async getMany(req: CrudRequest): Promise<GetManyDefaultResponse<T>> {
  //   const { page, ...query } = this.buildQuery(req);
  //   console.log(query.where);
  //   const data = await this.modelRepository.find(query);
  //   const total = await this.modelRepository.count({where: query.where});
  //   const {take = 0, skip = 0} = query;
  //   return this.createPageInfo(data, total, take, skip);
  // }

  // async getOne(req: CrudRequest): Promise<T> {
  //   const { id, ...query } = this.buildQuery(req);
  //   const data = await this.modelRepository.findOne(id, query);
  //   if (!data) {
  //     this.throwNotFoundException(this.modelRepository.target.toString());
  //     throw new Error('UNREACHABLE');
  //   }

  //   return data;
  // }
  // async createOne(req: CrudRequest | undefined, dto: T): Promise<T> {
  //   return await this.modelRepository.save(dto);
  // }
  // async createMany(req: CrudRequest, { bulk }: CreateManyDto<T>): Promise<T[]> {
  //   await this.modelRepository.insertMany(bulk);
  //   return bulk;
  // }
  // async updateOne(req: CrudRequest, dto: T): Promise<T> {
  //   const { id } = this.buildQuery(req);
  //   const entity = await this.modelRepository.findOne(id);
  //   if (!entity) {
  //     this.throwNotFoundException(this.modelRepository.target.toString());
  //     throw new Error('UNREACHABLE');
  //   }
  //   await this.modelRepository.save({...entity, ...dto});
  //   return entity;
  // }
  // async replaceOne(req: CrudRequest, dto: T): Promise<T> {
  //   const { id } = this.buildQuery(req);
  //   const data = await this.modelRepository.replaceOne(
  //     {
  //       id
  //     },
  //     dto
  //   );
  //   if (!data) {
  //     this.throwNotFoundException(this.modelRepository.target.toString());
  //     throw new Error('UNREACHABLE');
  //   }
  //   return this.modelRepository.findOne(id) as Promise<T>;
  // }
  // async deleteOne(req: CrudRequest): Promise<void | T> {
  //   const { id } = this.buildQuery(req);
  //   await this.modelRepository.findOneAndDelete({ id });
  //   return;
  // }

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
