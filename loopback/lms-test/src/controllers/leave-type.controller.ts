import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {LeaveType} from '../models';
import {LeaveTypeRepository} from '../repositories';

export class LeaveTypeController {
  constructor(
    @repository(LeaveTypeRepository)
    public leaveTypeRepository: LeaveTypeRepository,
  ) {}

  @post('/leave-types', {
    responses: {
      '200': {
        description: 'LeaveType model instance',
        content: {'application/json': {schema: getModelSchemaRef(LeaveType)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LeaveType, {
            title: 'NewLeaveType',
          }),
        },
      },
    })
    leaveType: LeaveType,
  ): Promise<LeaveType> {
    return this.leaveTypeRepository.create(leaveType);
  }

  @get('/leave-types/count', {
    responses: {
      '200': {
        description: 'LeaveType model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(LeaveType))
    where?: Where<LeaveType>,
  ): Promise<Count> {
    return this.leaveTypeRepository.count(where);
  }

  @get('/leave-types', {
    responses: {
      '200': {
        description: 'Array of LeaveType model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(LeaveType, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(LeaveType))
    filter?: Filter<LeaveType>,
  ): Promise<LeaveType[]> {
    return this.leaveTypeRepository.find(filter);
  }

  @patch('/leave-types', {
    responses: {
      '200': {
        description: 'LeaveType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LeaveType, {partial: true}),
        },
      },
    })
    leaveType: LeaveType,
    @param.query.object('where', getWhereSchemaFor(LeaveType))
    where?: Where<LeaveType>,
  ): Promise<Count> {
    return this.leaveTypeRepository.updateAll(leaveType, where);
  }

  @get('/leave-types/{id}', {
    responses: {
      '200': {
        description: 'LeaveType model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LeaveType, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(LeaveType))
    filter?: Filter<LeaveType>,
  ): Promise<LeaveType> {
    return this.leaveTypeRepository.findById(id, filter);
  }

  @patch('/leave-types/{id}', {
    responses: {
      '204': {
        description: 'LeaveType PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LeaveType, {partial: true}),
        },
      },
    })
    leaveType: LeaveType,
  ): Promise<void> {
    await this.leaveTypeRepository.updateById(id, leaveType);
  }

  @put('/leave-types/{id}', {
    responses: {
      '204': {
        description: 'LeaveType PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() leaveType: LeaveType,
  ): Promise<void> {
    await this.leaveTypeRepository.replaceById(id, leaveType);
  }

  @del('/leave-types/{id}', {
    responses: {
      '204': {
        description: 'LeaveType DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.leaveTypeRepository.deleteById(id);
  }
}
