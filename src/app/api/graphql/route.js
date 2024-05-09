// import { ApolloServer } from '@apollo/server';
import { ApolloServer, gql } from 'apollo-server-micro';


// import { gql } from '@apollo/client';
import GraphQLJSON from 'graphql-type-json';
import 'crypto';

const sign_db = []

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const typeDefs = gql`
    scalar JSON
    input InsertSign {
        nickname: String!,
        content: String!,
        country: String
    }
    type Query {
        sign(offset: Int!, limit: Int!, order_by: JSON): [Sign]!,
    }
    type Mutation {
        insert_sign(objects: InsertSign): NewSign,
    }
    type NewSign {
        returning: Sign,
    }
    type Sign {
        uuid: ID,
        created_at: String
        content: String,
        nickname: String,
        country: String
    }
`;

const resolvers = {
    Query: {
        sign(_, args) {
            const variable = JSON.parse(JSON.stringify(args));
            const offset = variable.offset;
            const limit = variable.limit;
            const order_by = variable.order_by.created_at;
            const sort_func = order_by.created_at === 'desc'
                ? (a, b) => Number(a.created_at) - Number(b.created_at)
                : (a, b) => Number(b.created_at) - Number(a.created_at)
            const signlist = sign_db.sort(sort_func).slice(offset, offset+limit)
            return signlist
        },
    },
    Mutation: {
        insert_sign(_, objects) {
            const uuid = uuidv4();
            const contents = JSON.parse(JSON.stringify(objects));
            const created_at = Date.now();
            const newSign = {
                ...contents.objects,
                created_at,
                uuid,
            }
            sign_db.push(newSign);
            return {returning: newSign};
        },
    }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

// 이전의 apolloServer.createHandler 로직을 함수로 변경
async function handleApolloServer(req, res) {
    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

// POST 요청만 처리
export async function POST(request) {
    // 여기서 request는 Next.js에서 제공하는 Fetch API와 유사한 인터페이스를 가지고 있습니다.
    // 따라서, request를 req, res 형태로 변환할 필요가 있을 수 있습니다.
    // 이는 Next.js 13의 새로운 App Router의 특징과 관련이 있습니다.

    // handleApolloServer에 request와 response를 전달

    // const response = new Response("OK", { status: 200 })
    const response = new Response();
    const res = await handleApolloServer(request, response);  // 여기서 두 번째 인자도 request로 전달되는 것은 임시적인 방법입니다. 실제로 적절한 변환 로직이 필요할 수 있습니다.

    // Response 반환
    return res;
}

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };