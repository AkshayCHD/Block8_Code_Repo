import {Model, model, property} from '@loopback/repository';

@model()
export class AddEmployeeRequest extends Model {
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


  constructor(data?: Partial<AddEmployeeRequest>) {
    super(data);
  }
}

export interface AddEmployeeRequestRelations {
  // describe navigational properties here
}

export type AddEmployeeRequestWithRelations = AddEmployeeRequest & AddEmployeeRequestRelations;
