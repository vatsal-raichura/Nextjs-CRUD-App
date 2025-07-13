import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { User } from "../types/User";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { deleteUser } from "../services/api";

interface Props {
  users: User[];
  refreshUsers: () => void;
}

const UserTable: React.FC<Props> = ({ users, refreshUsers }) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refreshUsers(); // re-fetch users after deletion
      } catch (err) {
        alert("Failed to delete user.");
        console.error(err);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/form?id=${id}`); // send ID as query param
  };

  const columns: GridColDef[] = [
     { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "age", headerName: "Age", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.7 },
    { field: "status", headerName: "Status", flex: 0.7 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon color="primary" />}
          label="Edit"
          onClick={() => handleEdit(params.id as string)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => handleDelete(params.id as string)}
        />,
      ],
      flex: 1,
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id as string}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default UserTable;
