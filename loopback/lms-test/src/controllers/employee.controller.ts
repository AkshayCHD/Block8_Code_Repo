import {repository} from '@loopback/repository';
import {EmployeeRepository} from '../repositories';
import {LeaveTypeRepository} from '../repositories';
import {post, requestBody, getModelSchemaRef} from '@loopback/rest';
import {LeaveType, Employee, AddEmployeeRequest} from '../models';

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
    @repository(LeaveTypeRepository)
    public leaveTypeRepository: LeaveTypeRepository,
  ) {}

  @post('/employee', {
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
          schema: getModelSchemaRef(Employee, {
            exclude: ['id', 'available', 'total', 'availed'],
          }),
        },
      },
    })
    employeeRequest: Employee,
  ): Promise<Object> {
    const leaveTypes = await this.leaveTypeRepository.find();
    let available: Array<LeaveType> = [],
      total: Array<LeaveType> = [],
      availed: Array<LeaveType> = [];
    for (const i in leaveTypes) {
      available = available.concat(leaveTypes[i]);
    }
    for (const i in leaveTypes) {
      total = total.concat(leaveTypes[i]);
    }
    for (const i in leaveTypes) {
      leaveTypes[i].daysCount = 0;
      availed = availed.concat(leaveTypes[i]);
    }
    employeeRequest.available = available;
    employeeRequest.availed = availed;
    employeeRequest.total = total;
    return this.employeeRepository.create(employeeRequest);
  }
}
