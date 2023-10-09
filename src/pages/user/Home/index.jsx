import { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input, Row, Col } from "antd";

import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import CreateTask from "./CreateTask";
import {
  addTask,
  updateTask,
  deleteTask,
} from "../../../redux/slicers/job.slice";
const HomePage = () => {
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);

  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState("");
  const { taskList } = useSelector((state) => state.task);
  const [dataTasks, setDataTasks] = useState(taskList.data);
  const handleShowTask = (e) => {
    setTextSearch(e.target.value);
  };
  useEffect(() => {
    const newDataTasks = taskList.data.filter(
      (dataTask) =>
        dataTask.title
          .toLowerCase()
          .replace(/\s/g, "")
          .indexOf(textSearch.toLowerCase().replace(/\s/g, "")) != -1
    );
    setDataTasks(newDataTasks);
  }, [textSearch, taskList.data]);

  const handleCreateTask = (values) => {
    dispatch(
      addTask({
        id: uuidv4(),
        ...values,
      })
    );
    setIsShowCreateModal(false);
  };
  const handleUpdateTask = (id, values) => {
    dispatch(updateTask({ id: id, values: values }));
  };
  const handleDeleteTask = (id) => {
    dispatch(deleteTask({ id: id }));
  };
  const renderTaskList = useMemo(() => {
    return dataTasks.map((item) => {
      return (
        <TaskItem
          key={item.id}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
          id={item.id}
          title={item.title}
          content={item.content}
        />
      );
    });
  }, [dataTasks]);

  return (
    <Row gutter={[16, 16]}>
      <Col md={24} xs={24}>
        <CreateTask
          isShowCreateModal={isShowCreateModal}
          handleCreateTask={handleCreateTask}
          setIsShowCreateModal={setIsShowCreateModal}
        />
        <Row gutter={[16, 16]}>
          <Col sm={16} xs={24}>
            <Input
              style={{ marginTop: "40px" }}
              placeholder="Search..."
              onChange={handleShowTask}
              value={textSearch}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16, marginBottom: 16 }}>
          {renderTaskList}
        </Row>
      </Col>
    </Row>
  );
};

export default HomePage;
