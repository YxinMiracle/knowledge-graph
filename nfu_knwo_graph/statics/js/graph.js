function getGraph(aXFoee1) {
    var cc$AzKw2 = {
        container_id: "viz",
        server_url: "bolt://localhost:7687",
        server_user: "neo4j",
        server_password: "newxin.001206",
        labels: {
            "c语言": {
                "caption": "name",
                "size": "points",
                "font": {
                    "size": 26,
                    "color": "#3bb9f3"
                },
                "title_properties": ["name", "_id", "desc"]
            },
            "Python语言": {
                "caption": "name",
                "title_properties": ["name", "_id", "desc"]
            },
            "C#语言": {
                "caption": "name",
                "title_properties": ["name", "_id", "desc"]
            },
        },
        relationships: {
            "知识点": {
                "thickness": "weight",
                "caption": true,
            },
            "详细": {
                "thickness": "weight",
                "caption": true,
            },
        },
        initial_cypher: aXFoee1
    };
    return cc$AzKw2
}