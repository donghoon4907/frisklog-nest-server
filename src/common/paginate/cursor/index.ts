// // import { Op } from 'sequelize';

// interface ICursorPaginateArgs {
//     before?: string;
//     after?: string;
//     order?: string[][];
//     where: any;
// }

// class CursorPaginate {
//     readonly order: string[][];
//     readonly where: any;
//     readonly before: string | null;

//     constructor(cursorPaginateArgs: ICursorPaginateArgs) {
//         const { before, after, order, where } = cursorPaginateArgs;

//         this.order = order;

//         this.before = before;

//         this.normalizeOrder();
//         if (before) {
//             this.reverseOrder();
//         }

//         let cursor = null;
//         if (before) {
//             cursor = this.parseCursor(before);
//         } else if (after) {
//             cursor = this.parseCursor(after);
//         }

//         let query = null;
//         if (cursor !== null) {
//             query = this.getPaginationQuery(cursor);
//         }

//         this.where = where;
//         if (query !== null) {
//             this.where = { [Op.and]: [query, where] };
//         }
//     }

//     response(instances, cursorCount, totalCount) {
//         if (this.before) {
//             instances.reverse();
//         }

//         const remaining = cursorCount - instances.length;

//         const hasNextPage =
//             (!this.before && remaining > 0) ||
//             (Boolean(this.before) && totalCount - cursorCount > 0);

//         const hasPreviousPage =
//             (Boolean(this.before) && remaining > 0) ||
//             (!this.before && totalCount - cursorCount > 0);

//         const edges = instances.map((node) => ({
//             node,
//             cursor: this.createCursor(node),
//         }));

//         const pageInfo = {
//             hasNextPage,
//             hasPreviousPage,
//             startCursor: edges.length > 0 ? edges[0].cursor : null,
//             endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
//         };

//         return {
//             totalCount,
//             edges,
//             pageInfo,
//         };
//     }

//     normalizeOrder() {
//         const { order } = this;

//         let normalized = [];

//         if (Array.isArray(order)) {
//             normalized = order.map((o) => {
//                 if (typeof o === 'string') {
//                     return [o, 'ASC'];
//                 }

//                 if (Array.isArray(o)) {
//                     const [field, direction] = o;

//                     return [field, direction || 'ASC'];
//                 }

//                 return o;
//             });
//         }

//         return this.ensurePrimaryKeyInOrder(normalized);
//     }

//     ensurePrimaryKeyInOrder(order) {
//         return [...order, ['id', 'ASC']];
//     }

//     reverseOrder() {
//         const { order } = this;

//         return order.map(([field, direction]) => [
//             field,
//             direction.toLowerCase() === 'desc' ? 'ASC' : 'DESC',
//         ]);
//     }

//     serializeCursor(payload: any[]) {
//         return Buffer.from(JSON.stringify(payload)).toString('base64');
//     }

//     createCursor(node) {
//         const { order } = this;

//         const payload = order.map(([field]) => node[field]);

//         return this.serializeCursor(payload);
//     }

//     parseCursor(cursor: string) {
//         if (!cursor) {
//             return null;
//         }

//         try {
//             return JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));
//         } catch (e) {
//             return null;
//         }
//     }

//     isValidCursor(cursor) {
//         return cursor.length === this.order.length;
//     }

//     recursivelyGetPaginationQuery(cursor, order) {
//         const op = order[0][1].toLowerCase() === 'desc' ? Op.lt : Op.gt;

//         if (order.length === 1) {
//             return {
//                 [order[0][0]]: {
//                     [op]: cursor[0],
//                 },
//             };
//         } else {
//             return {
//                 [Op.or]: [
//                     {
//                         [order[0][0]]: {
//                             [op]: cursor[0],
//                         },
//                     },
//                     {
//                         [order[0][0]]: cursor[0],
//                         ...this.recursivelyGetPaginationQuery(
//                             cursor.slice(1),
//                             order.slice(1),
//                         ),
//                     },
//                 ],
//             };
//         }
//     }

//     getPaginationQuery(cursor) {
//         if (!this.isValidCursor(cursor)) {
//             return null;
//         }

//         return this.recursivelyGetPaginationQuery(cursor, this.order);
//     }
// }

// export default CursorPaginate;
