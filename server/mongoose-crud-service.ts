import { CrudRequest, CreateManyDto, CrudService } from '@nestjsx/crud';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Model } from 'mongoose';

export class MongooseCrudService<T> extends CrudService<T> {
  recoverOne(req: CrudRequest): Promise<void | T> {
    throw new Error('Method not implemented.');
  }

  constructor(public model: Model<any> | ModelType<{}>) {
    super();
  }

  buildQuery(req: CrudRequest) {
    this.model;
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
      sort: sort.reduce(
        (acc: Record<string, number>, { order, field }) => (
          (acc[field] = order === 'ASC' ? 1 : -1), acc
        ),
        {}
      ),
      select: fields.join(' '),
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
    return {
      options,
      where,
      id: idParam ? idParam.value : null,
      populate: join.map((v) => v.field),
    };
  }

  async getMany(req: CrudRequest) {
    const { options, where, populate } = this.buildQuery(req);
    const queryBuilder = this.model
      .find()
      .setOptions({
        ...options,
      })
      .where({
        ...where,
      });
    populate.map((v) => {
      queryBuilder.populate(v);
    });

    const data = await queryBuilder.exec();
    if (options.page) {
      const total = await this.model.countDocuments(where);
      return this.createPageInfo(data, total, options.limit, options.skip);
    }
    return data;
  }

  async getOne(req: CrudRequest): Promise<T> {
    const { options, where, id, populate } = this.buildQuery(req);
    const queryBuilder = this.model
      .findById(id)
      .setOptions({
        ...options,
      })
      .where({
        ...where,
      });
    populate.map((v) => {
      queryBuilder.populate(v);
    });

    const data = await queryBuilder.exec();

    !data && this.throwNotFoundException(this.model.modelName);

    return data;
  }
  async createOne(req: CrudRequest, dto: T): Promise<T> {
    return this.model.create(dto);
  }
  async createMany(
    req: CrudRequest,
    { bulk }: CreateManyDto<T[]>
  ): Promise<T[]> {
    return this.model.insertMany(bulk) as Promise<T[]>;
  }
  async updateOne(req: CrudRequest, dto: T): Promise<T> {
    const { id } = this.buildQuery(req);
    const entity = await this.model.findById(id);
    Object.assign(entity, dto);
    await entity.save();
    return entity;
  }
  async replaceOne(req: CrudRequest, dto: T): Promise<T> {
    const { id } = this.buildQuery(req);
    const data = await this.model.replaceOne(
      {
        _id: id,
      },
      dto
    );
    !data && this.throwNotFoundException(this.model.modelName);
    return this.model.findById(id);
  }
  async deleteOne(req: CrudRequest): Promise<void | T> {
    const { id } = this.buildQuery(req);
    const data = await this.model.findById(id);
    !data && this.throwNotFoundException(this.model.modelName);
    await this.model.findByIdAndDelete(id);
    return data;
  }
}
