import { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import CreateJob from "./CreateJob";
import UpdateJob from "./UpdateJob";
import { Row, Col, Card, Input, Button, Space } from "antd";
import { addJob, updateJob } from "../../../redux/slicers/job.slice";
const HomePage = () => {
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);

  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const { jobList } = useSelector((state) => state.job);
  const [dataJobs, setDataJobs] = useState(jobList.data);
  const [updateData, setUpdateData] = useState({});
  const [cancelUpdate, setCancelUpdate] = useState(false);
  const [deleteUpdate, setdeleteUpdate] = useState(false);
  const handleShowJob = (e) => {
    setTextSearch(e.target.value);
  };
  useEffect(() => {
    const newDataJobs = jobList.data.filter(
      (dataJob) =>
        dataJob.title
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(textSearch.toLowerCase().replace(/\s/g, "")) != -1
    );
    setDataJobs(newDataJobs);
  }, [textSearch, jobList.data]);
  const handleCreateJob = (values) => {
    dispatch(
      addJob({
        id: uuidv4(),
        ...values,
      })
    );
    setIsShowCreateModal(false);
  };
  const handleUpdateJob = (values) => {
    dispatch(updateJob({ id: updateData.id, values }));
    setIsShowUpdateModal(false);
  };

  const renderJobList = useMemo(() => {
    return dataJobs.map((item) => {
      return (
        <Col lg={6} md={8} sm={8} xs={12} key={item.id}>
          <Card size="small" title={item.title}>
            <p style={{ minHeight: "10vh" }}>{item.content}</p>
            <Space size={24}>
              <Button
                type="primary"
                onClick={() => {
                  setUpdateData(item);
                  setIsShowUpdateModal(true);
                }}
              >
                Sửa
              </Button>
            </Space>
          </Card>
        </Col>
      );
    });
  }, [dataJobs]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col md={24} xs={24}>
          <Row gutter={[16, 16]}>
            <Col sm={16} xs={24}>
              <Input
                placeholder="Search..."
                onChange={handleShowJob}
                value={textSearch}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 16, marginBottom: 16 }}>
            {renderJobList}
          </Row>
          <Button onClick={() => setIsShowCreateModal(true)}>Add Job</Button>
          <CreateJob
            isShowCreateModal={isShowCreateModal}
            handleCreateJob={handleCreateJob}
            setIsShowCreateModal={setIsShowCreateModal}
          />
          <UpdateJob
            isShowUpdateModal={isShowUpdateModal}
            setIsShowUpdateModal={setIsShowUpdateModal}
            handleUpdateJob={handleUpdateJob}
            cancelUpdate={cancelUpdate}
            deleteUpdate={deleteUpdate}
            setCancelUpdate={setCancelUpdate}
            setdeleteUpdate={setdeleteUpdate}
            updateData={updateData}
          />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
