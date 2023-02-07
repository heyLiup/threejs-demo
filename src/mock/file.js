import Mock from "mockjs";

// mock方法,详细的可以看官方文档
const Random = Mock.Random;

export default [
  {
    url: "/api/graphData",
    type: "get",
    response: (config) => {
      return {
        code: 200,
        data: {
          graph: {
            node_id: "Modeling Methods",
            name: "根节点",
            layer: 0,
            children: [
              {
                node_id: "Classification",
                name: "Classification节点",
                layer: 1,
                children: [
                  {
                    node_id: "Logistic regression",
                    name: "regression节点",
                    layer: 2,
                  },
                  {
                    node_id: "Linear discriminant analysis",
                    name: "analysis节点",
                    layer: 2,
                  },

                  {
                    node_id: "Rules",
                    name: "Rules节点",
                    layer: 2,
                  },
                ],
              },
            ],
          },
        },
      };
    },
  },
];
