import {Entity, model, property} from '@loopback/repository';

@model()
export class LeaveType extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  daysCount: number;

  @property({
    type: 'number',
    required: true,
  })
  available: number;

  @property({
    type: 'number',
    required: true,
  })
  availed: number;

  constructor(data?: Partial<LeaveType>) {
    super(data);
  }
}

export interface LeaveTypeRelations {
  // describe navigational properties here
}

export type LeaveTypeWithRelations = LeaveType & LeaveTypeRelations;
