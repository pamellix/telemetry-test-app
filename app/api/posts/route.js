import {fixturesNews} from "../../../fixtures/news";

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": `${process.env.API_KEY}`
})

const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
}

export async function GET() {

    let imgArray = []

    for (let i = 0; i < fixturesNews[0].items.length; i++) {
        await fetch("https://api.thecatapi.com/v1/images/search", requestOptions)
            .then(res => res.text())
            .then(result => imgArray.push(JSON.parse(result)))
            .catch(error => console.log(error))
    }

    let i = 0;

    fixturesNews[0].items = fixturesNews[0].items.map((item) => ({...item, pictureSet: imgArray[i++][0]["url"]}))

    return new Response(JSON.stringify(fixturesNews), {
        headers: { 'Content-Type': 'application/json' }
    });
}