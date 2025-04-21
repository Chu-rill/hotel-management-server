--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'VALID',
    'EXPIRED'
);


ALTER TYPE public."BookingStatus" OWNER TO postgres;

--
-- Name: PaymentMethod; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentMethod" AS ENUM (
    'CREDIT_CARD',
    'DEBIT_CARD',
    'PAYPAL',
    'BANK_TRANSFER',
    'WALLET',
    'CASH'
);


ALTER TYPE public."PaymentMethod" OWNER TO postgres;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED'
);


ALTER TYPE public."PaymentStatus" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'STAFF',
    'CUSTOMER'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: RoomType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."RoomType" AS ENUM (
    'SINGLE',
    'DOUBLE',
    'SUITE'
);


ALTER TYPE public."RoomType" OWNER TO postgres;

--
-- Name: Satus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Satus" AS ENUM (
    'AVAILABLE',
    'BOOKED',
    'OCCUPIED',
    'MAINTENANCE'
);


ALTER TYPE public."Satus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Amenity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Amenity" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Amenity" OWNER TO postgres;

--
-- Name: Amenity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Amenity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Amenity_id_seq" OWNER TO postgres;

--
-- Name: Amenity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Amenity_id_seq" OWNED BY public."Amenity".id;


--
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    id text NOT NULL,
    "checkIn" timestamp(3) without time zone NOT NULL,
    "checkOut" timestamp(3) without time zone NOT NULL,
    "customerId" integer,
    "roomId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status public."BookingStatus" NOT NULL,
    "hotelId" text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- Name: Customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customer" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Customer" OWNER TO postgres;

--
-- Name: Customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Customer_id_seq" OWNER TO postgres;

--
-- Name: Customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Customer_id_seq" OWNED BY public."Customer".id;


--
-- Name: Hotel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Hotel" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    address text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    rating double precision,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imageUrl" text
);


ALTER TABLE public."Hotel" OWNER TO postgres;

--
-- Name: Otp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Otp" (
    id text NOT NULL,
    code text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email text NOT NULL
);


ALTER TABLE public."Otp" OWNER TO postgres;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    amount double precision NOT NULL,
    "paymentDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "bookingId" text NOT NULL,
    "customerId" integer NOT NULL,
    method public."PaymentMethod" DEFAULT 'DEBIT_CARD'::public."PaymentMethod" NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Payment_id_seq" OWNER TO postgres;

--
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- Name: Review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Review" (
    id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    "customerId" integer NOT NULL,
    "hotelId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Review" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Review_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Review_id_seq" OWNER TO postgres;

--
-- Name: Review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Review_id_seq" OWNED BY public."Review".id;


--
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    id text NOT NULL,
    price double precision NOT NULL,
    "hotelId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "amenityId" integer,
    status public."Satus" DEFAULT 'AVAILABLE'::public."Satus" NOT NULL,
    roomtype public."RoomType" DEFAULT 'SINGLE'::public."RoomType" NOT NULL,
    "roomNumber" integer DEFAULT 0 NOT NULL,
    images text[]
);


ALTER TABLE public."Room" OWNER TO postgres;

--
-- Name: RoomAmenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoomAmenities" (
    "roomId" text NOT NULL,
    "amenityId" integer NOT NULL
);


ALTER TABLE public."RoomAmenities" OWNER TO postgres;

--
-- Name: Staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Staff" (
    id integer NOT NULL,
    "hotelId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Staff" OWNER TO postgres;

--
-- Name: Staff_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Staff_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Staff_id_seq" OWNER TO postgres;

--
-- Name: Staff_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Staff_id_seq" OWNED BY public."Staff".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text,
    phone text,
    role public."Role" DEFAULT 'CUSTOMER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    profile text,
    username text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Amenity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenity" ALTER COLUMN id SET DEFAULT nextval('public."Amenity_id_seq"'::regclass);


--
-- Name: Customer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer" ALTER COLUMN id SET DEFAULT nextval('public."Customer_id_seq"'::regclass);


--
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- Name: Review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review" ALTER COLUMN id SET DEFAULT nextval('public."Review_id_seq"'::regclass);


--
-- Name: Staff id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Staff" ALTER COLUMN id SET DEFAULT nextval('public."Staff_id_seq"'::regclass);


--
-- Data for Name: Amenity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Amenity" (id, name) FROM stdin;
\.


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" (id, "checkIn", "checkOut", "customerId", "roomId", "createdAt", "updatedAt", status, "hotelId", "userId") FROM stdin;
cm9oc82dw0003ij94wo1ybb5f	2025-04-19 00:00:00	2025-05-02 00:00:00	\N	cm9j2b75p000fij18glm0usp9	2025-04-19 14:52:51.092	2025-04-19 14:52:51.092	VALID	cm9hnu9y10009ijwi6gdp2ifj	cm9litvxc0002ijmnv0xplvub
\.


--
-- Data for Name: Customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customer" (id, "createdAt", "updatedAt", "userId") FROM stdin;
14	2025-04-17 15:34:28.343	2025-04-17 15:34:28.343	cm9litvxc0002ijmnv0xplvub
16	2025-04-17 21:59:13.398	2025-04-17 21:59:13.398	cm9lwkoh80001ijeqmb0s9rx7
\.


--
-- Data for Name: Hotel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Hotel" (id, name, description, address, city, country, phone, email, rating, "createdAt", "updatedAt", "imageUrl") FROM stdin;
cm9hnxa53000cijwi9yzglug3	Hilltop Suites	Nestled in a serene location, Hilltop Suites offers breathtaking views, modern amenities, and a cozy atmosphere—perfect for both relaxing getaways and business stays.	Gwarinpa Estate, Abuja	Abuja	Nigeria	+2348098765432	hilltopsuites@gmail.com	\N	2025-04-14 22:46:00.087	2025-04-15 23:10:52.853	https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744757420/hilltop_sordea.jpg
cm9hnu9y10009ijwi6gdp2ifj	Paradise Inn	Paradise Inn is a serene beachfront hotel nestled along a pristine shoreline, offering guests a tranquil escape with stunning ocean views. Featuring cozy, tropical-inspired rooms, a palm-lined beach, and warm hospitality, it’s the perfect retreat for relaxation and rejuvenation under the sun.	Ring Road, Ibadan	Ibadan	Nigeria	+2348123456789	paradiseinn@gmail.com	\N	2025-04-14 22:43:39.865	2025-04-15 23:08:53.259	https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744756932/palm_inn_jvrnlx.jpg
cm9hnvzpl000aijwio6mupy0r	Savannah Luxury Hotel	Savannah Luxury Hotel is an elegant retreat nestled in the heart of historic Savannah, offering refined accommodations with timeless Southern charm. Guests can indulge in spacious, beautifully appointed rooms, savor gourmet dining, and unwind at the rooftop lounge with panoramic city views. Perfect for those seeking a blend of sophistication and cultural immersion.	Independence Layout, Enugu	Enugu	Nigeria	+2348087654321	savannahluxury@gmail.com	\N	2025-04-14 22:44:59.914	2025-04-15 23:08:53.259	https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744757234/savannah_s1jd67.jpg
cm9hnwoa7000bijwiozwd4rtc	Ocean Breeze Resort	Ocean Breeze Resort is a serene beachfront escape, offering luxurious accommodations with stunning ocean views, modern amenities, and a tranquil atmosphere. Nestled along pristine shores, it’s the perfect destination for relaxation and rejuvenation, with easy access to water activities, fine dining, and tropical serenity.	Lekki Phase 1, Lagos	Lagos	Nigeria	+2347012345678	oceanbreeze@gmail.com	\N	2025-04-14 22:45:31.759	2025-04-15 23:08:53.259	https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744757337/ocean_fexg3o.jpg
cm9hnyi5m000eijwival72uey	Emerald Palace Hotel	Nestled in the heart of the city, Emerald Palace Hotel offers a perfect blend of luxury, comfort, and elegance — an ideal escape for both business and leisure travelers.	Airport Road, Kano	Kano	Nigeria	+2348067890123	emeraldpalace@gmail.com	\N	2025-04-14 22:46:57.131	2025-04-15 23:10:50.449	https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744757571/emerald_enattg.jpg
cm9hnxvw1000dijwifmnez01r	Grand Oasis Hotel	Experience comfort and luxury at Grand Oasis Hotel — a serene escape offering modern amenities, elegant rooms, and exceptional service in the heart of the city.	15 Victoria Island, Lagos	Lagos	Nigeria	+2348023456789	grandoasis@gmail.com	\N	2025-04-14 22:46:28.273	2025-04-15 23:10:50.449	https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744757500/grand_iepixw.jpg
\.


--
-- Data for Name: Otp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Otp" (id, code, "expiresAt", "createdAt", email) FROM stdin;
cm9hni11y0008ijwinfbw21mm	884904	2025-04-14 22:39:08.47	2025-04-14 22:34:08.471	admin@gmail.com
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payment" (id, amount, "paymentDate", "bookingId", "customerId", method, status) FROM stdin;
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, rating, comment, "customerId", "hotelId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Room" (id, price, "hotelId", "createdAt", "updatedAt", "amenityId", status, roomtype, "roomNumber", images) FROM stdin;
cm9j20ed60001ij18ak5tzrx2	1500	cm9hnyi5m000eijwival72uey	2025-04-15 22:08:06.331	2025-04-16 17:33:11.752	\N	AVAILABLE	SINGLE	1	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744229897/room_images/w0bvezzmg00inhhdbufa.jpg}
cm9j23o650009ij182ut0rlq3	5000	cm9hnvzpl000aijwio6mupy0r	2025-04-15 22:10:39.005	2025-04-16 17:33:11.752	\N	AVAILABLE	SINGLE	1	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744229897/room_images/w0bvezzmg00inhhdbufa.jpg,https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744229899/room_images/dpoohwvllllgz7fdccwp.jpg}
cm9j2b75p000fij18glm0usp9	1000	cm9hnu9y10009ijwi6gdp2ifj	2025-04-15 22:16:30.205	2025-04-16 17:33:11.752	\N	AVAILABLE	SINGLE	1	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744229899/room_images/dpoohwvllllgz7fdccwp.jpg}
cm9j24cim000dij1891w27m8a	9000	cm9hnvzpl000aijwio6mupy0r	2025-04-15 22:11:10.558	2025-04-16 17:33:11.752	\N	AVAILABLE	DOUBLE	3	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744229899/room_images/dpoohwvllllgz7fdccwp.jpg}
cm9j2cl6c000jij18bxlxv5j1	500	cm9hnxvw1000dijwifmnez01r	2025-04-15 22:17:35.028	2025-04-16 17:33:11.752	\N	AVAILABLE	SINGLE	1	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744824618/room1_njabmp.jpg}
cm9j22h5l0005ij18cp10eesb	30000	cm9hnxa53000cijwi9yzglug3	2025-04-15 22:09:43.258	2025-04-16 17:33:11.752	\N	AVAILABLE	SUITE	1	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744824654/room2_qxtcq8.jpg}
cm9j21ej00003ij18222oo25m	1000	cm9hnyi5m000eijwival72uey	2025-04-15 22:08:53.196	2025-04-16 17:33:11.752	\N	AVAILABLE	SINGLE	2	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744824662/room3_bm5f2o.jpg}
cm9j240jf000bij188mjznq6m	20000	cm9hnvzpl000aijwio6mupy0r	2025-04-15 22:10:55.035	2025-04-16 17:33:11.752	\N	AVAILABLE	SUITE	2	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744824654/room2_qxtcq8.jpg}
cm9j22sae0007ij183xauykov	3000	cm9hnxa53000cijwi9yzglug3	2025-04-15 22:09:57.686	2025-04-16 17:33:11.752	\N	AVAILABLE	DOUBLE	2	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744229899/room_images/dpoohwvllllgz7fdccwp.jpg}
cm9j2bx30000hij18z3lxqrgw	1000	cm9hnwoa7000bijwiozwd4rtc	2025-04-15 22:17:03.805	2025-04-16 17:33:11.752	\N	AVAILABLE	SINGLE	1	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1744824618/room1_njabmp.jpg}
cm9pzbac50001ijjddukggc6c	50000	cm9hnu9y10009ijwi6gdp2ifj	2025-04-20 18:26:58.709	2025-04-20 18:38:55.901	\N	AVAILABLE	SINGLE	12	{https://res.cloudinary.com/dxgwbxcgq/image/upload/v1745174335/room_images/ddalkboi7hcnt85ylbr1.jpg}
\.


--
-- Data for Name: RoomAmenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RoomAmenities" ("roomId", "amenityId") FROM stdin;
\.


--
-- Data for Name: Staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Staff" (id, "hotelId", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, phone, role, "createdAt", "updatedAt", "isVerified", profile, username) FROM stdin;
cm9hni0xt0006ijwifftsf4zu	admin@gmail.com	$2b$10$EvBzhkwo.F5k8ZJIqSc5ze61YVVH0Sb6wNvxU2sKm/Ppul/dgbToq	+2348150442746	ADMIN	2025-04-14 22:34:08.321	2025-04-14 22:34:36.471	t	\N	admin
cm9litvxc0002ijmnv0xplvub	churchilldaniel687@gmail.com	\N	\N	CUSTOMER	2025-04-17 15:34:28.321	2025-04-17 15:34:28.371	t	https://lh3.googleusercontent.com/a/ACg8ocKGqXrhb05nVWv0kOIkmW3HXkzN0m8KM5y1NlMNw55Nx8LJRGU=s96-c	Churchill Daniel
cm9lwkoh80001ijeqmb0s9rx7	chatwithmelcomex.co@gmail.com	\N	\N	CUSTOMER	2025-04-17 21:59:13.389	2025-04-17 21:59:13.409	t	https://lh3.googleusercontent.com/a/ACg8ocJFRxsPY5lgmXrUzCAlg6GulXHCqp7rVBKzlDePegsuzIy29lM=s96-c	Melcom eX
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
10b15a9b-b321-4bf9-b798-c3ae8e307edb	dfda0ce1483f9a34a63597d07eb9373bdcf8ac2cd3e4e4d700879076d01b9d43	2025-04-19 13:37:34.604244+01	20250419123734_added_userid_to_booking	\N	\N	2025-04-19 13:37:34.3132+01	1
37178b81-a6c3-42e0-abfe-536cb3df0870	7e4e5fc210493aaa371f22f4ac1f8d0cf7a24e47584003852f345d41c4e77138	2025-04-13 19:59:48.796789+01	20250305074412_model	\N	\N	2025-04-13 19:59:48.410641+01	1
e24e8483-f3b5-45d2-966f-08d9ef7054d5	90164814eec3955757c861eeff49bfaa204ce7d554c2bc040a74659cd70da24f	2025-04-13 19:59:49.71354+01	20250322141206_removed_roomnumber	\N	\N	2025-04-13 19:59:49.637235+01	1
4ad14410-b1a6-438f-94d2-8157847d7a4a	28307eba923d3e830c24b1f77a68cc8e763e1834114b3735419014e5d6e111fb	2025-04-13 19:59:48.906827+01	20250305091123_added_cuid	\N	\N	2025-04-13 19:59:48.808658+01	1
75046173-9f3b-46c6-b2b0-3cad092d14ed	603f81ecb92149dcd87ed29f37b6e75e7829b7d2170e42765eece9dd61235de5	2025-04-13 19:59:48.991713+01	20250313125116_added_otp_model	\N	\N	2025-04-13 19:59:48.916412+01	1
1f01f518-fa07-40e2-b2a9-b753b1b52fb3	f6f001a7388591b0c93f8f171c9f6c11011855e76b3a31f3f35e2e2faf6f41d0	2025-04-13 19:59:50.72675+01	20250409191021_added_images_to_rooms	\N	\N	2025-04-13 19:59:50.701801+01	1
edcff39e-a255-4902-8c52-a63fad7233c4	1ac74ee76cc7df5cef07a17e2762e9d202d12437b708cb07c8f5735e8dfd6eb2	2025-04-13 19:59:49.057711+01	20250313134439_updated_otp_model	\N	\N	2025-04-13 19:59:49.001966+01	1
d7bd3e79-dc38-438e-8dc9-f72e01544e31	2e2428fa2a8feb238c49a7bae5d9aaaa6e5bd88c027672cb97acf3558ba576fb	2025-04-13 19:59:50.258919+01	20250322145954_changed_hotel_id_to_string	\N	\N	2025-04-13 19:59:49.729096+01	1
81b9c183-b02a-4095-ad52-298518d0e5c8	5bd3e6b81e94e863d38a42103460cfa61a26b331241b4cddd50aa025a4b32107	2025-04-13 19:59:49.096415+01	20250313204942_edited_user_model	\N	\N	2025-04-13 19:59:49.066056+01	1
f29d50f4-0047-4148-bc67-b081a16f7483	4e130be12c15ed87aebda5b2804045505e47a7954ac0efb0f2b574c3f3ef4414	2025-04-13 19:59:49.151496+01	20250313214620_added_email_to_otp	\N	\N	2025-04-13 19:59:49.109229+01	1
42459ff3-acc5-44b5-8d51-94e83a0ea245	fa3cc919db9515500ffc55097c50997b2e5d572419c6e6fd29a54c1ebfcc7ad3	2025-04-13 19:59:49.195558+01	20250314044915_added_isverified_in_user_model	\N	\N	2025-04-13 19:59:49.161746+01	1
1d1349e2-50c3-49d0-a2e2-e6574cb71f73	bb03aaa2140fc69f523c3c5d01617aed016cd8044b64dde4355491649776ee3f	2025-04-13 19:59:50.359229+01	20250404193224_adde_room_number	\N	\N	2025-04-13 19:59:50.328449+01	1
5a7a2be1-70e9-46ef-be5b-9d35b2419819	9cb51e0b7636fa960d2bd9f801893d4151f9fbecb6d7514cfd9cd8926b70ca3d	2025-04-13 19:59:49.247543+01	20250314061527_made_password_optional	\N	\N	2025-04-13 19:59:49.205996+01	1
670f8a53-22f9-4245-a267-8ee15812fa71	9bbeca413fe4289ad9ca720919656bb36e79303490338a18acc12f32ef565170	2025-04-13 19:59:49.344096+01	20250314154159_added_profile_user_model	\N	\N	2025-04-13 19:59:49.259598+01	1
3e560bd7-a972-47ed-8188-2327fdae8b53	ae9d1f8da0fd8b57280020b22bcb45de3c80260a8fd37b17aaeb5d64f2e806a8	2025-04-13 19:59:49.414431+01	20250315221659_added_roomtype	\N	\N	2025-04-13 19:59:49.382877+01	1
03c2dc84-6b16-4217-8260-250c93b18ccb	91845eaba749909bf9893d104136ad478212a9e78ea946b76a11a951ae73a581	2025-04-13 19:59:50.478529+01	20250404200707_changed_room_id_to_string	\N	\N	2025-04-13 19:59:50.368044+01	1
1542c76c-e2d4-4d50-bca7-59ce93e64f62	f11322a24bc76c60b7b3280fd02888939b1df0308083e64edf7e34d06b2efb7d	2025-04-13 19:59:49.481167+01	20250319232938_made_hotel_name_unique	\N	\N	2025-04-13 19:59:49.42558+01	1
4f8f0c61-322d-4fbf-873a-db94c2cc14d5	0fa5c08d55542a81088fcd9fcb427032bf365558865cd1daa9914220e7d43ba0	2025-04-13 19:59:49.591996+01	20250320221323_edited_status_enum	\N	\N	2025-04-13 19:59:49.491254+01	1
2eb2cca1-fa1c-4646-801b-5ee062dec42c	1ffdfdd9de11890e994adfa4541023ea72a1422c2ab7bbe5e63b1061172d57ba	2025-04-13 19:59:50.764833+01	20250413183306_changed_usermodel_to_username	\N	\N	2025-04-13 19:59:50.733708+01	1
180f1f38-6975-4a1d-a79d-41f55c05e17a	107ecf0c92c083316b6e3bd66521d1a396f4f57e78a68c3f63fffe1dc66802fa	2025-04-13 19:59:49.627332+01	20250320225108_added_booking_status	\N	\N	2025-04-13 19:59:49.600796+01	1
b839c4be-1d11-4644-84e3-d1234a2ecaa4	fd9b7879840eba1d4695afcb13901fee08bf8378c005f7768074b4a9481eac82	2025-04-13 19:59:50.511948+01	20250406145928_added_hotel_id_in_booking	\N	\N	2025-04-13 19:59:50.487837+01	1
f596bcf1-8bf8-4c4a-b49a-722143d4729f	dbfb53b5eeaef866d573028543cf73c61b170d21a54cf75ecdfe518d7f5dc5ad	2025-04-13 19:59:50.627301+01	20250406192335_changed_booking_id_to_string	\N	\N	2025-04-13 19:59:50.520988+01	1
b69b75de-f5d0-426c-ba3a-c9d1ed0190de	6f0732a3fecdd6988cc2adc1dda047d6976e2b75073bfe1c8b46990dcf8b3abf	2025-04-13 19:59:50.659148+01	20250408220325_added_aproved_to_booking	\N	\N	2025-04-13 19:59:50.634776+01	1
3ac10fc5-faf7-4d30-ac9c-5b51dcdcac2a	838b4c5cb0813648253ab24b6fcde7bccd3da6a20f1b0d18f8f42f272a667e80	2025-04-13 19:59:55.191888+01	20250413185955_changed_usermodel_to_username	\N	\N	2025-04-13 19:59:55.166606+01	1
f62af2c8-5e5a-4e8d-b404-7d0fe3873322	41865629338797f86097523edeb896d3964149c3389a30c1c0717c5214ad1f66	2025-04-13 19:59:50.692431+01	20250409185755_removed_approved_from_booking	\N	\N	2025-04-13 19:59:50.669378+01	1
91768934-dcc6-4d68-82cc-8f79ee2179a0	1631f0f1814517bc8a49334c981271e8dfc87ce6a780aaf4f680a6170545c848	2025-04-13 20:00:54.400022+01	20250413190054_edited	\N	\N	2025-04-13 20:00:54.358846+01	1
ded891fe-5561-4050-8c0d-62e736d40fd0	7caa4116da6e2177456592427a76f399dbe19e702c693f20f5ce99365fb00993	2025-04-15 23:37:29.282715+01	20250415223729_added_image_url_to_hotel	\N	\N	2025-04-15 23:37:29.226675+01	1
\.


--
-- Name: Amenity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Amenity_id_seq"', 1, false);


--
-- Name: Customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Customer_id_seq"', 16, true);


--
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 1, false);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 1, false);


--
-- Name: Staff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Staff_id_seq"', 1, false);


--
-- Name: Amenity Amenity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Amenity"
    ADD CONSTRAINT "Amenity_pkey" PRIMARY KEY (id);


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: Hotel Hotel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotel"
    ADD CONSTRAINT "Hotel_pkey" PRIMARY KEY (id);


--
-- Name: Otp Otp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otp"
    ADD CONSTRAINT "Otp_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: RoomAmenities RoomAmenities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomAmenities"
    ADD CONSTRAINT "RoomAmenities_pkey" PRIMARY KEY ("roomId", "amenityId");


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


--
-- Name: Staff Staff_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Staff"
    ADD CONSTRAINT "Staff_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Amenity_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Amenity_name_key" ON public."Amenity" USING btree (name);


--
-- Name: Booking_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Booking_id_key" ON public."Booking" USING btree (id);


--
-- Name: Customer_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Customer_userId_key" ON public."Customer" USING btree ("userId");


--
-- Name: Hotel_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Hotel_id_key" ON public."Hotel" USING btree (id);


--
-- Name: Hotel_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Hotel_name_key" ON public."Hotel" USING btree (name);


--
-- Name: Otp_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Otp_email_key" ON public."Otp" USING btree (email);


--
-- Name: Payment_bookingId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Payment_bookingId_key" ON public."Payment" USING btree ("bookingId");


--
-- Name: Room_hotelId_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Room_hotelId_id_key" ON public."Room" USING btree ("hotelId", id);


--
-- Name: Room_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Room_id_key" ON public."Room" USING btree (id);


--
-- Name: Staff_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Staff_userId_key" ON public."Staff" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_id_key" ON public."User" USING btree (id);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Booking Booking_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Booking Booking_hotelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES public."Hotel"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Booking Booking_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Customer Customer_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Otp Otp_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Otp"
    ADD CONSTRAINT "Otp_email_fkey" FOREIGN KEY (email) REFERENCES public."User"(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payment Payment_bookingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Payment Payment_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Review Review_hotelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES public."Hotel"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RoomAmenities RoomAmenities_amenityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomAmenities"
    ADD CONSTRAINT "RoomAmenities_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES public."Amenity"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: RoomAmenities RoomAmenities_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomAmenities"
    ADD CONSTRAINT "RoomAmenities_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Room Room_amenityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES public."Amenity"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Room Room_hotelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES public."Hotel"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Staff Staff_hotelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Staff"
    ADD CONSTRAINT "Staff_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES public."Hotel"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Staff Staff_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Staff"
    ADD CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

