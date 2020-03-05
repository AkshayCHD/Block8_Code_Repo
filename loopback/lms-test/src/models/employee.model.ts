import {Entity, model, property} from '@loopback/repository';

@model()
export class Employee extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  doj: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
  })
  approver?: string;

  @property({
    type: 'string',
    required: true,
  })
  gender: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'object',
    required: true,
  })
  available: object;

  @property({
    type: 'object',
    required: true,
  })
  total: object;

  @property({
    type: 'object',
    required: true,
  })
  availed: object;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
