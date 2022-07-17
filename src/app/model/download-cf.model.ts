import { DataCf } from './data-cf.model';
import { OperationResult } from './operation-result.model';
import { ConstanciaRequestCfdi } from './constancia-request-cfdi.model';
export class DownloadCf {
    fileName: string;
    dataResult: DataCf;
    listData: ConstanciaRequestCfdi[];
    operationResult: OperationResult;
}
