import { OffsetPaginatedArgs } from 'src/common/paging/offset/offset.args';
import { PostVisibility } from '../post.interface';
export declare class PostsArgs extends OffsetPaginatedArgs {
    searchKeyword?: string;
    userId?: string;
    visibility?: PostVisibility;
}
