import {
  EdgeModel,
  NodeModel,
  RunStatus,
  WhenStatus,
} from '@patternfly/react-topology';

import { AddNodeDirection, NodeType } from '../consts/pipeline-topology-const';
import { PipelineTask } from './pipeline';
import { PipelineRunKind } from './pipelineRun';
import { TaskRunKind } from './taskRun';

// Builder Callbacks
export type NewTaskListNodeCallback = (direction: AddNodeDirection) => void;
export type NewTaskNodeCallback = (resource: TaskRunKind) => void;
export type RemoveListTaskCallback = () => void;
export type NodeSelectionCallback = (nodeData: BuilderNodeModelData) => void;

export type TaskSearchCallback = (callback: () => void) => void;

// Node Data Models
export type PipelineRunAfterNodeModelData = {
  id?: string;
  width?: number;
  height?: number;
  selected?: boolean;
  status?: RunStatus;
  whenStatus?: WhenStatus;
  pipelineRun?: PipelineRunKind;
  label?: string;
  runAfterTasks?: string[];
  task: {
    name: string;
    runAfter?: string[];
  };
};

type FinallyTask = {
  name: string;
  runAfter?: string[];
  error?: string;
  selected?: boolean;
  disableTooltip?: boolean;
  onTaskSelection?: () => void;
};
type FinallyListTask = {
  name: string;
  convertList: (resource: TaskRunKind) => void;
  onRemoveTask: () => void;
};
type FinallyNodeTask = {
  name: string;
  runAfter: string[];
  selected?: boolean;
  isFinallyTask: boolean;
  finallyTasks: FinallyTask[];
};
export type FinallyNodeData = {
  task: FinallyNodeTask;
};

export type PipelineBuilderTaskBase = { name: string; runAfter?: string[] };

export type PipelineBuilderListTask = PipelineBuilderTaskBase;

export type PipelineBuilderLoadingTask = PipelineBuilderTaskBase & {
  isFinallyTask: boolean;
  resource: TaskRunKind;
  taskRef: {
    kind: string;
    name: string;
  };
};

export type BuilderFinallyNodeData = {
  task: FinallyNodeTask & {
    finallyInvalidListTasks: FinallyListTask[];
    finallyLoadingTasks: PipelineBuilderLoadingTask[];
    finallyListTasks: FinallyListTask[];
    addNewFinallyListNode?: () => void;
    onTaskSearch: TaskSearchCallback;
  };
};
export type FinallyNodeModel = FinallyNodeData & {
  pipelineRun?: PipelineRunKind;
  isFinallyTask: boolean;
};
export type LoadingNodeModel = PipelineRunAfterNodeModelData & {
  isFinallyTask: boolean;
};
export type BuilderFinallyNodeModel = BuilderFinallyNodeData & {
  clusterTaskList: TaskRunKind[];
  namespaceTaskList: TaskRunKind[];
  namespace: string;
  isFinallyTask: boolean;
};

export type TaskListNodeModelData = PipelineRunAfterNodeModelData & {
  clusterTaskList: TaskRunKind[];
  namespaceTaskList: TaskRunKind[];
  onNewTask: NewTaskNodeCallback;
  onRemoveTask: RemoveListTaskCallback | null;
  onTaskSearch: TaskSearchCallback;
};
export type BuilderNodeModelData = PipelineRunAfterNodeModelData & {
  error?: string;
  task: PipelineTask;
  onAddNode: NewTaskListNodeCallback;
  onNodeSelection: NodeSelectionCallback;
};
export type SpacerNodeModelData = PipelineRunAfterNodeModelData;
export type TaskNodeModelData = PipelineRunAfterNodeModelData & {
  task: PipelineTask;
  pipelineRun?: PipelineRunKind;
};

// Graph Models
type PipelineNodeModel<D extends PipelineRunAfterNodeModelData> = NodeModel & {
  data: D;
  type: NodeType;
};
export type PipelineMixedNodeModel =
  PipelineNodeModel<PipelineRunAfterNodeModelData>;
export type PipelineTaskNodeModel = PipelineNodeModel<TaskNodeModelData>;
export type PipelineBuilderTaskNodeModel =
  PipelineNodeModel<BuilderNodeModelData>;
export type PipelineTaskListNodeModel =
  PipelineNodeModel<TaskListNodeModelData>;
export type PipelineTaskLoadingNodeModel = PipelineNodeModel<LoadingNodeModel>;
export type PipelineFinallyNodeModel = PipelineNodeModel<FinallyNodeModel>;
export type PipelineBuilderFinallyNodeModel =
  PipelineNodeModel<BuilderFinallyNodeModel>;

export type PipelineEdgeModel = EdgeModel;

// Node Creators
export type NodeCreator<D extends PipelineRunAfterNodeModelData> = (
  name: string,
  data: D,
) => PipelineNodeModel<D>;
export type NodeCreatorSetup = (
  type: NodeType,
  width?: number,
  height?: number,
) => NodeCreator<PipelineRunAfterNodeModelData>;

export type CheckTaskErrorMessage = (taskIndex: number) => string | undefined;
