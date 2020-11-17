import {Inject} from '@nestjs/common';
import {IEventRepository} from '../Repository/IEventRepository';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import { ILeaveRepository } from 'src/Domain/HumanResource/Leave/Repository/ILeaveRepository';

export class DoesEventsOrLeaveExistForPeriod {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    @Inject('ILeaveRepository')
    private readonly leaveRepository: ILeaveRepository
  ) {}

  public async isSatisfiedBy(
    user: User,
    startDate: string,
    endDate: string
  ): Promise<boolean> {
    const [ events, leaves ] = await Promise.all([
      this.eventRepository.countExistingEventsByUserAndPeriod(user, startDate, endDate),
      this.leaveRepository.countExistingLeavesByUserAndPeriod(user, startDate, endDate)
    ]);

    return events + leaves > 0;
  }
}
