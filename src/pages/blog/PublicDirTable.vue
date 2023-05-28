<template>
    <div>
        <el-table
            :data="decodedData()"
            style="width: 100%"
            max-height="600px"
            row-key="id"
            stripe
            highlight-current-row
            border
            lazy
            :load="load"
            :tree-props="{ children: 'merge', hasChildren: 'hasChildren' }">
            <el-table-column
                :label="t('name')"
                width="280px">
                <template #default="{ row }">
                    <el-popover
                        v-if="getType(row) === '数据表'"
                        effect="light"
                        trigger="hover"
                        placement="top"
                        width="auto">
                        <template #default>
                            <el-button
                                link
                                type="primary">
                                <a
                                    :href="viewPublicData(row)"
                                    target="_blank">
                                    {{ t('click to view') }}
                                </a>
                            </el-button>
                            <br />
                            <el-button
                                link
                                type="warning">
                                <a
                                    :href="editPublicData(row)"
                                    target="_blank">
                                    {{ t('click to edit') }}
                                </a>
                            </el-button>
                        </template>
                        <template #reference>
                            {{ getName(row) }}
                        </template>
                    </el-popover>
                    <template v-if="getType(row) === '文件夹'">
                        {{ getName(row) }}
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('type')"
                width="100px"
                align="center">
                <template #default="{ row }">
                    <el-tag :type="getTypeColor(row)">
                        {{
                            getType(row) === '文件夹' ? t('dir') : t('dataset')
                        }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('create time')"
                width="185px"
                align="center">
                <template #default="{ row }">
                    <div style="display: flex; align-items: center">
                        <i-ep-timer style="margin-right: 10px" />
                        {{ row.initTime }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('update time')"
                width="185px"
                align="center">
                <template #default="{ row }">
                    <div style="display: flex; align-items: center">
                        <i-ep-timer style="margin-right: 10px" />
                        {{ getUpdateTime(row) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="createBy"
                :label="t('create by')"
                width="80px"
                align="center" />
            <el-table-column
                :label="t('able to update')"
                width="85px"
                align="center">
                <template #default="{ row }">
                    {{ getEditable(row) }}
                </template>
            </el-table-column>
            <el-table-column
                :label="t('dataset info')"
                align="center">
                <el-table-column
                    :label="t('type')"
                    width="185px"
                    align="center">
                    <template #default="{ row }">
                        <el-tag :type="getTableTypeColor(row)">
                            {{ getTableType(row) }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="t('engine')"
                    width="100px"
                    align="center">
                    <template #default="{ row }">
                        <el-tag :type="getEngineTypeColor(row)">
                            {{ getEngineType(row) }}
                        </el-tag>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import BILoginStore from '@/store/finebi'
import { PublicFolder, PublicTable } from '@/types'
import JSONP, { isPublicFolderData } from '@/utils/jsonp'
import { ElMessage, ElTag } from 'element-plus'

interface FolderTable extends PublicFolder {
    initTime: string
    folders: Array<FolderTable>
    hasChildren?: boolean
    merge: Array<PublicTable | FolderTable>
}

const { t } = useI18n()
const useBILoginStore = BILoginStore()
const { getToken } = useBILoginStore
const route = useRoute()

const setHasChildren = (folder: FolderTable): FolderTable => {
    const proxyFolder = reactive(folder)
    if (Array.isArray(folder.merge) && folder.merge.length > 0) {
        proxyFolder.hasChildren = true
        proxyFolder.folders.forEach((subFolder: FolderTable) => {
            setHasChildren(subFolder)
        })
    } else {
        proxyFolder.hasChildren = false
    }
    return proxyFolder
}
const convertToFolder = (data: FolderTable): FolderTable => {
    const folder: FolderTable = {
        initTime: '',
        id: '',
        name: '',
        editable: false,
        createBy: '',
        parentId: '',
        coopAnalysis: false,
        creatorAuth: false,
        folders: [],
        merge: [],
    }

    folder.id = data.id
    folder.name = data.name
    folder.initTime = new Date(data.initTime).toLocaleString()
    folder.editable = data.editable
    folder.createBy = data.createBy
    folder.parentId = data.parentId
    folder.coopAnalysis = data.coopAnalysis
    folder.creatorAuth = data.creatorAuth
    folder.folders = data.folders
    folder.subjects = data.subjects
    folder.tables = data.tables
    if (typeof data.tables === 'undefined') {
        folder.merge = [...data.folders]
    } else if (Array.isArray(data.tables.availableTables)) {
        folder.merge = [...data.folders, ...data.tables.availableTables]
    } else {
        folder.merge = [...data.folders]
    }

    if (Array.isArray(data.folders)) {
        folder.folders = data.folders.map((item: FolderTable) =>
            convertToFolder(item)
        )
    }
    const realFolder = setHasChildren(folder)
    return realFolder
}
const decodedData = (): FolderTable[] => {
    const temp = route.params.data
    if (Array.isArray(temp)) {
        ElMessage.warning('返回的数据不是字符串！')
        return [
            {
                initTime: '',
                id: '',
                name: '数据传错了哦',
                editable: false,
                createBy: '',
                parentId: '',
                coopAnalysis: false,
                creatorAuth: false,
                folders: [],
                merge: [],
            },
        ]
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const answer = [convertToFolder(JSON.parse(temp))]
    return answer
}
const isFolderTable = (obj: FolderTable | PublicTable): obj is FolderTable => {
    if ('merge' in obj) return true
    return false
}
const getType = (row: FolderTable | PublicTable): string => {
    if (isFolderTable(row)) {
        return '文件夹'
    }
    return '数据表'
}
const getTypeColor = (row: FolderTable | PublicTable) => {
    if (isFolderTable(row)) {
        return 'info'
    }
    return 'success'
}
const getName = (row: FolderTable | PublicTable): string => {
    if (isFolderTable(row)) {
        return row.name
    }
    return row.transferName
}
const viewPublicData = (row: PublicTable): string => {
    const url = `http://master:8080/webroot/decision/v5/api/conf/page#config/${
        row.name
    }?fine_auth_token=${getToken()}`
    return url
}
const editPublicData = (row: PublicTable): string => {
    const url = `http://master:8080/webroot/decision/v5/conf/analysis/page?tableName=${
        row.name
    }?fine_auth_token=${getToken()}`
    return url
}

const getTableType = (row: FolderTable | PublicTable): string => {
    if (isFolderTable(row)) {
        return '/'
    }
    if (row.type === 1) {
        return t('db_t')
    }
    if (row.type === 2) {
        return t('sql_t')
    }
    return t('other_t')
}
const getTableTypeColor = (row: FolderTable | PublicTable) => {
    if (isFolderTable(row)) {
        return 'danger'
    }
    if (row.type === 1) {
        return 'success'
    }
    if (row.type === 2) {
        return ''
    }
    return 'info'
}
const getEditable = (row: FolderTable | PublicTable): string => {
    if (row.editable) {
        return t('yes')
    }
    return t('no')
}
const getUpdateTime = (row: FolderTable | PublicTable): string => {
    if (isFolderTable(row)) {
        return '/'
    }
    return new Date(row.configUpdateTime).toLocaleString()
}
const getEngineType = (row: FolderTable | PublicTable): string => {
    if (isFolderTable(row)) {
        return '/'
    }
    if (row.engineType === 'direct') {
        return t('direct')
    }
    if (row.engineType === 'spider') {
        return t('spider')
    }
    return t('other')
}
const getEngineTypeColor = (row: FolderTable | PublicTable) => {
    if (isFolderTable(row)) {
        return 'danger'
    }
    if (row.engineType === 'direct') {
        return 'success'
    }
    if (row.engineType === 'spider') {
        return ''
    }
    return 'info'
}
const isPublicFolder = (
    obj: FolderTable[] | PublicFolder[]
): obj is PublicFolder[] => {
    if (obj.length === 0) return false
    if (typeof obj[0].initTime === 'number') return true
    return false
}
const convertToFolderTable = (
    publicFolder: PublicFolder,
    folder: FolderTable
): FolderTable[] => {
    const folderTable = reactive(folder)
    // 逐一复制 publicFolder 的 folders 属性到 folderTable 的 folders 属性
    folderTable.folders = publicFolder.folders.map(
        (publicSubFolder: PublicFolder) => {
            let merges: Array<PublicTable | FolderTable> = []
            if (typeof publicSubFolder.tables === 'undefined') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                merges = [...publicSubFolder.folders]
            } else if (Array.isArray(publicSubFolder.tables.availableTables)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                merges = [
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    ...publicSubFolder.folders,
                    ...publicSubFolder.tables.availableTables,
                ]
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                merges = [...publicSubFolder.folders]
            }
            const subFolder: FolderTable = reactive({
                initTime: new Date(publicSubFolder.initTime).toLocaleString(),
                id: publicSubFolder.id,
                name: publicSubFolder.name,
                editable: publicSubFolder.editable,
                createBy: publicSubFolder.createBy,
                parentId: publicSubFolder.parentId,
                coopAnalysis: publicSubFolder.coopAnalysis,
                creatorAuth: publicSubFolder.creatorAuth,
                tables: publicSubFolder.tables,
                folders: publicSubFolder.folders,
                merge: merges,
            })
            // 递归调用 convertToFolderTable，实现子文件夹的转换
            convertToFolderTable(publicSubFolder, subFolder)

            return subFolder
        }
    )
    return folderTable.folders
}
const load = (
    row: FolderTable,
    treeNode: unknown,
    resolve: (data: FolderTable[]) => void
) => {
    setTimeout(() => {
        const children: FolderTable[] = row.folders.map(
            (folder: FolderTable) => {
                let merges: Array<PublicTable | FolderTable> = []
                if (typeof folder.tables === 'undefined') {
                    merges = [...folder.folders]
                } else if (Array.isArray(folder.tables.availableTables)) {
                    merges = [
                        ...folder.folders,
                        ...folder.tables.availableTables,
                    ]
                } else {
                    merges = [...folder.folders]
                }
                return {
                    id: folder.id,
                    name: folder.name,
                    initTime: folder.initTime,
                    editable: folder.editable,
                    createBy: folder.createBy,
                    parentId: folder.parentId,
                    coopAnalysis: folder.coopAnalysis,
                    creatorAuth: folder.creatorAuth,
                    folders: folder.folders,
                    subjects: folder.subjects,
                    tables: folder.tables,
                    merge: merges,
                    hasChildren: folder.merge && folder.merge.length > 0,
                }
            }
        )
        // 调用接口
        const promises = children.map((child: FolderTable) => {
            const proxyChild = reactive(child)
            const packId = proxyChild.id
            const url = `/v5/api/conf/packs/${packId}?fine_auth_token=${getToken()}`
            return JSONP(url, {
                timeout: 10000,
            })
                .then((data) => {
                    if (isPublicFolderData(data)) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        const res = data.data
                        proxyChild.tables = res.tables
                        if (isPublicFolder(res.folders)) {
                            proxyChild.folders = convertToFolderTable(
                                res,
                                proxyChild
                            )
                        }
                        if (typeof proxyChild.tables === 'undefined') {
                            proxyChild.merge = [...proxyChild.folders]
                        } else if (
                            Array.isArray(proxyChild.tables.availableTables)
                        ) {
                            proxyChild.tables.availableTables =
                                proxyChild.tables.availableTables.map(
                                    (obj: PublicTable) => {
                                        return {
                                            ...obj,
                                            initTime: new Date(
                                                obj.initTime
                                            ).toLocaleString(),
                                        }
                                    }
                                )
                            proxyChild.merge = [
                                ...proxyChild.folders,
                                ...proxyChild.tables.availableTables,
                            ]
                        } else {
                            proxyChild.merge = [...proxyChild.folders]
                        }
                        proxyChild.hasChildren =
                            proxyChild.merge && proxyChild.merge.length > 0
                        proxyChild.initTime = new Date(
                            res.initTime
                        ).toLocaleString()
                        console.log(`${proxyChild.name}的id为:${proxyChild.id}`)
                        console.warn(proxyChild)
                    } else {
                        ElMessage.error({
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            message: `<b>子表文件夹数据解析失败!请确认您是否登录或登录已过期</b> <br/> <i>${data.errorMsg}</i>`,
                            dangerouslyUseHTMLString: true,
                        })
                    }
                    return data
                })
                .catch((err) => {
                    ElMessage.error({
                        message: `<b>子表文件夹信息获取失败!</b> <br/> <i>${err}</i>`,
                        dangerouslyUseHTMLString: true,
                    })
                })
        })
        Promise.all(promises)
            // eslint-disable-next-line promise/always-return
            .then(() => {
                resolve(children)
            })
            .catch((error) => {
                ElMessage.error({
                    message: `树形子数据解析失败！\n err:${error}`,
                })
                resolve([])
            })
    }, 1000)
}
</script>
