<template>
    <div>
        <el-table
            :data="decodedData()"
            style="width: 100%"
            max-height="550px"
            row-key="reportId"
            stripe
            highlight-current-row
            border>
            <el-table-column
                prop="name"
                :label="t('name')"
                align="center"></el-table-column>
            <el-table-column
                :label="t('create time')"
                align="center"
                sortable
                :sort-method="(a: Dashboard, b: Dashboard) => {
                    return Number(a.initTime) - Number(b.initTime)
                }">
                <template #default="{ row }">
                    <div style="display: flex; align-items: center">
                        <i-ep-timer style="margin-right: 10px" />
                        {{ new Date(row.initTime).toLocaleString() }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('update time')"
                align="center"
                sortable
                :sort-method="(a: Dashboard, b: Dashboard) => {
                    return Number(a.lastUpdateTime) + Number(a.initTime)
                            - Number(b.lastUpdateTime) - Number(b.initTime)
                }">
                <template #default="{ row }">
                    <div style="display: flex; align-items: center">
                        <i-ep-timer style="margin-right: 10px" />
                        {{
                            new Date(
                                Number(row.lastUpdateTime) +
                                    Number(row.initTime)
                            ).toLocaleString()
                        }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('watermark')"
                align="center"
                :filters="[
                    { text: t('yes'), value: t('yes') },
                    { text: t('no'), value: t('no') },
                ]"
                :filter-method="
                    (value: any, row: any) => {
                        return (
                            (row.watermark === true ? t('yes') : t('no')) ===
                            value
                        )
                    }
                ">
                <template #default="{ row }">
                    <el-tag>
                        {{ row.watermark === true ? t('yes') : t('no') }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                :label="t('operation')"
                width="150px"
                align="center">
                <template #default="{ row }">
                    <el-button
                        type="primary"
                        size="small"
                        @click="ViewDashboard(row)">
                        {{ t('view') }}
                    </el-button>
                    <el-button
                        type="warning"
                        size="small"
                        @click="EditDashboard(row)">
                        {{ t('edit') }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import BILoginStore from '@/store/finebi'
import { Dashboard } from '@/types'

const { t } = useI18n()
const useBILoginStore = BILoginStore()
const { getData, getToken } = useBILoginStore
const isDashboard = (obj: Dashboard | unknown): obj is Dashboard => {
    if (typeof obj === 'object' && obj) {
        if ('reportId' in obj) {
            return true
        }
    }

    return false
}
const convertToDashboard = (data: Dashboard): Dashboard => {
    return {
        reportId: data.reportId,
        name: data.name,
        initTime: new Date(data.initTime).toLocaleString(),
        lastUpdateTime: new Date(
            Number(data.initTime) + Number(data.lastUpdateTime)
        ).toLocaleString(),
        createBy: data.createBy,
        watermark: data.watermark,
    }
}
const decodedData = (): Dashboard[] => {
    const temp = getData()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const obj = JSON.parse(decodeURIComponent(temp))
    if (isDashboard(obj)) {
        const answer = [convertToDashboard(obj)]
        return answer
    }
    console.warn(obj)
    return obj
}
const ViewDashboard = (row: Dashboard) => {
    const url = `http://master:8080/webroot/decision/v5/design/report/${
        row.reportId
    }/view?fine_auth_token=${getToken()}`
    window.open(url, '_blank')
}
const EditDashboard = (row: Dashboard) => {
    const url = `http://master:8080/webroot/decision/v5/design/report/${
        row.reportId
    }/edit?fine_auth_token=${getToken()}`
    window.open(url, '_blank')
}
</script>
