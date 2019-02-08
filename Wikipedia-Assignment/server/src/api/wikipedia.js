import scrapeIt from "scrape-it";
import cheerio from 'cheerio';
/**
 * City Schema for ScrapeIt
 * @type
 */
const citySchema = (source,selector)=>{
    return {
        cities: {
            listItem: selector
            , name: "cities"
            , data: {
                name: {
                    selector: "td:nth-child(2)"
                },
                country: {
                    selector: "td:nth-child(4)"
                },
                population: {
                    selector: "td:nth-child(5)"
                },
                image: {
                    selector: "td:nth-child(3) img",
                    attr: "src"
                },
                url: {
                    selector: "td:nth-child(2) a",
                    attr: "href",
                    convert: url => source + url
                }
            }
        }
    }

};
/**
 * City Description Schema
 * @type {{}}
 */
const cityDescriptionSchema = (selector,name,urlSuffix)=> {
    return {
        description : {
            selector,
            eq : 0,
            /**
             * Logic  - Get the first paragraph that starts with
             * city name as thats the convention followed in
             * the wikipedia
             * @param ele
             * @returns {*}
             */
            how : (ele)=>{
                let output;
                const pElements = ele.find(".infobox + p");
                if(pElements.length>0){
                    output = pElements[0];
                }  else {
                    const children = ele.children("p");
                    let text;
                    for(let i=0;i<children.length;i++){
                        text = cheerio(children[i]).text();
                        if(text.startsWith(name) || text.startsWith(urlSuffix)){
                            output = cheerio(children[i]);
                            break;
                        }
                    }
                }
                return output?cheerio(output).text():""
            }
        }
    }
};
/**
 * Get Data
 * @param req
 * @param res
 */
export async function get(req, res) {
    const {source, path,descriptionSelector, selector} = this.cities;
    try {
        /**
         * Use scrape it to get information from wikipedia.
         */
        const response = await scrapeIt(source + path, citySchema(source,selector));
        let {data} = response;
        /**
         * Filter empty response
         */
        data = (data.cities || []).filter(({name}) => {
            return (name || "").trim() != ""
        }).map(async (city)=>{
            const {url,name} = city;
            let urlSuffix = url.split("/").pop();
            urlSuffix = urlSuffix.split("_").join(" ");
            const descriptionResponse = await scrapeIt(url,cityDescriptionSchema(descriptionSelector,name,urlSuffix));
            city.description = descriptionResponse.data.description;
            return city;
        });
        data = await Promise.all(data);
        return res.status(200).send(data);
    } catch (e) {
        return res.status(e.statusCode || 500).send(e.message || e);
    }
}

/**
 * Function for getting individual city description
 * For Testing
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
export async function getOne(req,res){
    let {url,name} = req.query;
    const {descriptionSelector} = this.cities;
    try {
        if(url){
            let urlSuffix = url.split("/").pop();
            urlSuffix = urlSuffix.split("_").join(" ");
            console.log(urlSuffix,name)
            const response = await scrapeIt(url,cityDescriptionSchema(descriptionSelector,name,urlSuffix));
            return res.status(200).send(response.data);
        } else {
            throw "City Url is mandatory"
        }
    } catch(e){
        return res.status(e.statusCode || 500).send(e.message || e);
    }
}
