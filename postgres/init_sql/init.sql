create table public.mst_user
(
  user_id     varchar(60) not null
    constraint mst_user_pkey
      primary key,
  user_name   varchar(128),
  create_date varchar(14) not null,
  create_user varchar(60) not null,
  update_date varchar(14) not null,
  update_user varchar(60) not null
);

INSERT INTO public.mst_user (user_id, user_name, create_date, create_user, update_date, update_user)
VALUES ('test001', 'ホゲさん', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
INSERT INTO public.mst_user (user_id, user_name, create_date, create_user, update_date, update_user)
VALUES ('test002', 'フガさん', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
INSERT INTO public.mst_user (user_id, user_name, create_date, create_user, update_date, update_user)
VALUES ('test003', 'ピヨさん', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
INSERT INTO public.mst_user (user_id, user_name, create_date, create_user, update_date, update_user)
VALUES ('test004', 'フーさん', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
INSERT INTO public.mst_user (user_id, user_name, create_date, create_user, update_date, update_user)
VALUES ('test005', 'ホーさん', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM', to_char(now(), 'YYYYMMDDHH24MISS'), 'SYSTEM');
