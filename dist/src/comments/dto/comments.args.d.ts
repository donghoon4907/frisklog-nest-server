import { OffsetPaginatedArgs } from '../../common/paging/offset/offset.args';
export declare class CommentsArgs extends OffsetPaginatedArgs {
    postId: string;
    order?: string[][];
}
