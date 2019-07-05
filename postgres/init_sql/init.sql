create table mst_user
(
	user_id varchar(60) not null
		constraint mst_user_pkey
			primary key,
	user_name varchar(128),
	tel varchar(14),
	gender varchar(8),
	create_user varchar(60),
	create_date varchar(14),
	update_user varchar(60),
	update_date varchar(14)
);

alter table mst_user owner to postgres;



INSERT INTO mst_user (user_id, user_name, tel, gender, create_date, create_user, update_date, update_user)
VALUES ('test001', 'ホゲさん', '09012345678', 'man', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
INSERT INTO mst_user (user_id, user_name, tel, gender, create_date, create_user, update_date, update_user)
VALUES ('test002', 'フガさん', '09012345678', 'man', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
INSERT INTO mst_user (user_id, user_name, tel, gender, create_date, create_user, update_date, update_user)
VALUES ('test003', 'ピヨさん', '09012345678', 'man', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
INSERT INTO mst_user (user_id, user_name, tel, gender, create_date, create_user, update_date, update_user)
VALUES ('test004', 'フーさん', '09012345678', 'man', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
INSERT INTO mst_user (user_id, user_name, tel, gender, create_date, create_user, update_date, update_user)
VALUES ('test005', 'ホーさん', '09012345678', 'man', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
