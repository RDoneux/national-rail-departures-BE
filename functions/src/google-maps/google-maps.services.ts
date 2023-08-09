import { Router, Request, Response } from "express";
import { Controller } from "../controller";
import * as https from "https";
import { URL } from "url";
// import * as cors from "cors";

export class GoogleMapsService implements Controller {
  collection: string = "google-maps";
  path: string = "/google-maps";

  router: Router = Router();

  // whitelist = ["http://localhost:4200/departures"];
  // corsOptions = {
  //   origin: (origin: any, callback: any) => {
  //     console.log(origin);
  //     var originIsWhiteListed = this.whitelist.indexOf(origin) != -1;
  //     callback(null, originIsWhiteListed);
  //   },
  // };

  initaliseRoutes(): void {
    this.router.get("/", this.getNearestStation);
  }

  getNearestStation = (request: Request, response: Response) => {

    // const options: http.RequestOptions = {
    //   hostname: "https://maps.googleapis.com",
    //   path: "/maps/api/place/nearbysearch/json",
    //   method: "GET",
    // };

    // const requestUrl = url.parse(url.format({
    //     protocol: 'https',
    //     hostname: 'yoursite.com',
    //     pathname: '/the/path',
    //     query: {
    //         key: value
    //     }
    // }));

    const requestUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    );

    requestUrl.protocol = "GET";
    requestUrl.searchParams.set("key", request.query.key as string);
    requestUrl.searchParams.set("location", request.query.location as string);
    requestUrl.searchParams.set("type", "train_station");
    requestUrl.searchParams.set("rankby", "distance");

    // response.status(200).send(requestUrl);

    // requestUrl.searchParams.set('','')

    let data = "";
    const call = https.get(requestUrl, (callResponse) => {
      callResponse.setEncoding("utf8");

      callResponse.on("data", (chunk) => {
        data += chunk;
      });

      callResponse.on("end", () => {
        response.status(200).send(data);
      });
    });

    call.on("error", (error) => {
      console.log(error);
    });

    call.end();
  };
}
