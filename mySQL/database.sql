create database student;

use student;
create table sinhVien (
                          id int primary key auto_increment,
                          name varchar(100),
                          age int,
                          address varchar(100),
                          idPoint int
);
create table point (
                       idPoint int primary key  auto_increment ,
                       namePoint varchar(20)
);
use student;
select * from sinhVien join diem p on sinhVien.idPoint = p.idPoint