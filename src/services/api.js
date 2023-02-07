import request from "../commons/request";

export function graphData() {
  return request({
    url: "/api/graphData",
    method: "get",
  });
}
