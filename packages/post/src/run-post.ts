import * as core from '@actions/core'
import {deleteTmpNotebooks} from './delete-tmp-notebook'
import {DATABRICKS_TMP_NOTEBOOK_UPLOAD_DIR_STATE_KEY} from '../../common/src/constants'
import {
  runStepAndHandleFailure,
  getDatabricksToken,
  getDatabricksHost
} from '../../common/src/utils'

async function runPostHelper(): Promise<void> {
  const tmpNotebookDirectory = core.getState(
    DATABRICKS_TMP_NOTEBOOK_UPLOAD_DIR_STATE_KEY
  )
  if (tmpNotebookDirectory) {
    await deleteTmpNotebooks(
      getDatabricksHost(),
      getDatabricksToken(),
      tmpNotebookDirectory
    )
  }
}

export async function runPost(): Promise<void> {
  await runStepAndHandleFailure(runPostHelper)
}
