import {fixturesNews} from "../../../fixtures/news";

export async function GET() {
    return new Response(JSON.stringify(fixturesNews), {
        headers: { 'Content-Type': 'application/json' }
    });
}