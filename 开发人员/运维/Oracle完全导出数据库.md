# Oracle小结|完全导出数据库|建立自增索引
1. 完全导出数据库
在cmd下执行
exp username/password rows=y indexes=n compress=n buffer=65536 feedback=100000 owner=username file=d:\username_%date%.dmp
2. 建立自增索引
    1. 删除原有索引，先删主键再删索引 然后再建主键
    2. 建立索引 用sql工具即可e.g. seq_ef_target
    3. 建立Trigger
        直接在sql windows中 
        ```
        create or replace trigger ADMIN.ef_target_trigger
        before insert on ef_target
        for each row
        begin
        select seq_ef_target.nextval into:new.ID from sys.dual ;
        end; 
        ```