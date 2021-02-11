import openpyxl
from py2neo import Graph, Node, Relationship, NodeMatcher
from utils.tools import get_md5


def get_data():
    wb = openpyxl.load_workbook("c语言考纲.xlsx")

    sh = wb["Sheet1"]

    rows_list = list(sh.rows)[1:]

    for row in rows_list:
        print(row[0].value, row[1].value, row[2].value)

    wb.close()


def test_neo4j():
    g = Graph("http://localhost:7474", username="neo4j", password="newxin.001206")

    wb = openpyxl.load_workbook("Python.xlsx")
    label = "Python语言"
    sh = wb["Sheet1"]
    rows_list = list(sh.rows)[1:]
    for row in rows_list:
        matcher = NodeMatcher(g)
        name1 = row[0].value
        name2 = row[1].value
        if not matcher.match(label, name=name1).first():
            node = g.create(Node(label, name=name1, _id=get_md5(name1)))
            print(node)
        if not matcher.match(label, name=name2).first():
            node = g.create(Node(label, name=name2, _id=get_md5(name2)))
            print(node)


    for row in rows_list:
        name1 = row[0].value
        name2 = row[1].value
        relationship_name = row[2].value
        _name1_md5 = get_md5(name1)
        _name2_md5 = get_md5(name2)
        query = "match(p:%s),(q:%s) where p._id='%s' and q._id='%s' create (p)-[r:%s]->(q)"%(label,label,_name1_md5,_name2_md5,relationship_name)
        g.run(query)
        print("yes!")
        # relationship_name = row[2].value
        # node1 = Node(label, name=name1, _id=get_md5(name1))
        # if matcher.match(label,name=name1).first():
        #     for row2 in rows_list:
        #         if row2[0].value == name1:
        #             name_new_2 = row2[1].value
        #             node2 = Node(label, name=name_new_2, _id=get_md5(name2))
        #             ab = Relationship(node1, relationship_name, node2)
        #             g.create(ab)
        #             print(name_new_2,"!!!")
        # else:
        #     node2 = Node(label,name=name2,_id=get_md5(name2))
        #     ab = Relationship(node1, relationship_name, node2)
        #     g.create(ab)


if __name__ == '__main__':
    test_neo4j()
