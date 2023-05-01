import { SearchKeyword } from '../search-keywords.entity';
declare const CreateSearchKeywordDto_base: import("@nestjs/common").Type<Pick<SearchKeyword, "keyword" | "ip">>;
export declare class CreateSearchKeywordDto extends CreateSearchKeywordDto_base {
    userId?: string;
}
export {};
