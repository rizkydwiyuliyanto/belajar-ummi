// const Dashboard = lazy(() => import('pages/dashboard'));
import { Outlet } from 'react-router-dom';
import { lazy } from 'react';
const Signin = lazy(() => import('pages/authentication/Signin'));
const Signup = lazy(() => import('pages/authentication/Signup'));
// Admin
const DashboardAdmin = lazy(() => import('pages/admin/dashboard/Index'));
const SantriAdmin = lazy(() => import('pages/admin/master/data_santri'));
const GuruAdmin = lazy(() => import('pages/admin/master/data_guru'));
const TambahGuru = lazy(() => import('pages/admin/master/data_guru/tambah'));
const EditGuru = lazy(() => import('pages/admin/master/data_guru/edit'));
const TambahSantri = lazy(() => import('pages/admin/master/data_santri/tambah'));
const EditSantri = lazy(() => import('pages/admin/master/data_santri/edit'));

// Guru
const DashboardGuru = lazy(() => import('pages/guru/dashboard'));
const MateriGuru = lazy(() => import('pages/guru/materi/index'));
const TambahTingkatan = lazy(() => import("pages/guru/tingkatan/tambah/index"));
const DetailTingkatanGuru = lazy(() => import("pages/guru/tingkatan/detail/index"));
const MasterSoal = lazy(() => import("pages/guru/soal/index"));
const Asesment = lazy(() => import("pages/guru/asesment/index"));
const DetailAsesment = lazy(() => import("pages/guru/asesment/detail/index"));
const Kategori = lazy(() => import("pages/guru/tingkatan/kategori/index"));
const TambahKategori = lazy(() => import("pages/guru/tingkatan/kategori/tambah/index"));
const EditKategori = lazy(() => import("pages/guru/tingkatan/kategori/edit/index"));

// Santri
const DashboardSantri = lazy(() => import("pages/santri/dashboard"));
const LatihanSoal = lazy(() => import("pages/santri/belajar_baca/LatihanSoal/index"));
const Mengaji = lazy(() => import("pages/santri/belajar_baca/Mengaji/index"));
const DetailJilid = lazy(() => import("pages/santri/belajar_baca/Mengaji/Detail/index"));
const Pembahasan = lazy(() => import("pages/santri/belajar_baca/LatihanSoal/Pembahasan/index"));
export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};
interface RouteItem {
  path: string;
  name: string;
  id: string;
  element: React.ReactNode;
  children?: RouteItem[];
}
const admin: RouteItem[] = [
  {
    path: `/${rootPaths.pageRoot}/admin/dashboard`,
    id: 'dashboard',
    name: 'Dashboard',
    element: <DashboardAdmin />,
  },
  {
    path: `/${rootPaths.pageRoot}/admin/master`,
    id: 'master',
    name: 'Master',
    element: <Outlet />,
    children: [
      {
        path: `/${rootPaths.pageRoot}/admin/master/data_guru`,
        id: 'data_guru',
        name: 'Data guru',
        element: <GuruAdmin />,
      },
      {
        path: `/${rootPaths.pageRoot}/admin/master/data_guru/tambah`,
        id: 'tambah',
        name: 'Tambah',
        element: <TambahGuru />,
      },
      {
        path: `/${rootPaths.pageRoot}/admin/master/data_guru/edit/:id_guru`,
        id: 'edit',
        name: 'Edit',
        element: <EditGuru />,
      },
    ],
  },
];
const guru = [
  {
    path: `/${rootPaths.pageRoot}/guru/dashboard`,
    id: 'dashboard',
    name: 'Dashboard',
    element: <DashboardGuru />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/materi`,
    id: 'materi',
    name: 'Ummi',
    element: <MateriGuru />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/materi/tambah_tingkatan`,
    id: 'tambah',
    name: 'Tambah',
    element: <TambahTingkatan />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/materi/detail_tingkatan/:id_tingkatan`,
    id: 'detail',
    name: 'Detail',
    element: <DetailTingkatanGuru />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/materi/kategori_tingkatan/:id_tingkatan`,
    id: 'detail',
    name: 'Detail',
    element: <Kategori />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/materi/kategori_tingkatan/tambah/:id_tingkatan`,
    id: 'tambah',
    name: 'Tambah',
    element: <TambahKategori />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/materi/kategori_tingkatan/edit/:id_tingkatan/:id_kategori`,
    id: 'edit',
    name: 'Edit',
    element: <EditKategori />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/soal`,
    id: 'soal',
    name: 'Soal',
    element: <MasterSoal />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/master/data_santri`,
    id: 'data_santri',
    name: 'Data santri',
    element: <SantriAdmin />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/master/data_santri/tambah`,
    id: 'tambah',
    name: 'Tambah',
    element: <TambahSantri />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/master/data_santri/edit/:id_santri`,
    id: 'edit',
    name: 'Edit',
    element: <EditSantri />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/asesmen`,
    id: 'asesmen',
    name: 'Asesment',
    element: <Asesment />,
  },
  {
    path: `/${rootPaths.pageRoot}/guru/asesmen/:id_santri/:id_tingkatan`,
    id: "detail",
    name: "Detail",
    element: <DetailAsesment />
  }
]
const santri = [
  {
    path: `/${rootPaths.pageRoot}/santri/dashboard`,
    id: 'dashboard',
    name: 'Dashboard',
    element: <DashboardSantri />,
  },
  {
    path: `/${rootPaths.pageRoot}/santri/latihan`,
    id: 'latihan',
    name: 'Latihan',
    element: <Outlet />,
    children: [
      {
        path: `/${rootPaths.pageRoot}/santri/latihan/latihan_soal/pembahasan/:id_nilai`,
        id: 'detail',
        name: 'Detail',
        element: <Pembahasan />,
      },
      {
        path: `/${rootPaths.pageRoot}/santri/latihan/mengaji`,
        id: 'mengaji',
        name: 'Mengaji',
        element: <Mengaji />,
      },
      {
        path: `/${rootPaths.pageRoot}/santri/latihan/latihan_soal`,
        id: 'latihan_soal',
        name: 'Latihan soal',
        element: <LatihanSoal />,
      },
      {
        path: `/${rootPaths.pageRoot}/santri/latihan/mengaji/:id_tingkatan`,
        id: 'detail',
        name: 'Detail',
        element: <DetailJilid />,
      },
    ]
  }
]
const privateRoutes = [
  ...admin.map((x) => {
    return {
      ...x,
      role: "admin"
    };
  }),
  ...guru.map((x) => {
    return {
      ...x,
      role: "guru"
    };
  }),
  ...santri.map((x => {
    return {
      ...x,
      role: "santri"
    }
  }))
];
const authRoutes = [
  {
    path: `/${rootPaths.authRoot}/signin`,
    name: 'Sign-in',
    element: <Signin />,
  },
  {
    path: `/${rootPaths.authRoot}/signup`,
    name: 'Sign-up',
    element: <Signup />,
  },
];
export { privateRoutes, authRoutes };
// export default {
//   dashboard: `/${rootPaths.pageRoot}/dashboard`,
//   task: `/${rootPaths.pageRoot}/task`,
//   mentors: `/${rootPaths.pageRoot}/mentors`,
//   messages: `/${rootPaths.pageRoot}/messages`,
//   settings: `/${rootPaths.pageRoot}/settings`,
//   dashboard_admin: `/${rootPaths.pageRoot}/dashboard`,
//   signin: `/${rootPaths.authRoot}/signin`,
//   signup: `/${rootPaths.authRoot}/signup`,
//   forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
//   404: `/${rootPaths.errorRoot}/404`,
// };
