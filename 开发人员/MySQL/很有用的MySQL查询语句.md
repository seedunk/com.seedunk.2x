1. MySQL自动插入时间的格式
   表中所有日期增加一天：update 表名 set 日期字段名 =date_add(日期字段名，interval 天数 day)
 