
Problems Encountered:
---------------------

- While trying to fetch the node body from an external site ( kcom.com ) using mysql_query and inserting the body in es.kabbalah database using db_query, the body was breaking 
on special characters like -,',""

Solution :
- used mysql_query to make inserts in the es.kabbalah database
 