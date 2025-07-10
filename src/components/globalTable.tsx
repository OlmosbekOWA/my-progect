

import React from "react";
import { Table, Typography } from "antd";
import type {
  ColumnsType,
  
  TableProps,
} from "antd/es/table";


const { Title } = Typography;

type GlobalTableProps = {
  title?: string;
  columns: ColumnsType<any>; 
  data: any[];
  rowKey?: string;
  loading?: boolean;
  total?: number;
  pageSize?: number;
  onChange?: TableProps<any>["onChange"]; 
  currentPage?: number;
};

const GlobalTable: React.FC<GlobalTableProps> = ({
  title,
  columns,
  data,
  rowKey = "id",
  loading = false,
  total,
  pageSize = 10,
  onChange,
  currentPage,
}) => {
  return (
    <div className="p-6 bg-white rounded shadow max-w-full overflow-auto">
      {title && <Title level={3}>{title}</Title>}

      <Table
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        loading={loading}
        onChange={onChange}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          showSizeChanger: false,
        }}
        bordered
      />

      {typeof total === "number" && (
        <div className="text-right text-sm text-gray-500 mt-2">
          Jami: {total} ta
        </div>
      )}
    </div>
  );
};

export default GlobalTable;








