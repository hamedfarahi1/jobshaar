
import { ModelBase } from '../base/model.base';
import { IEmployer } from '../employer/employer.model';

export interface IJob extends ModelBase {
  employer: IEmployer;
  universityTypeindex: number;
  description: string;
  jobCategoryTypeIndex: number;
  coperationTypeIndex: number;
  requiredGenderTypeIndex: number;
}
