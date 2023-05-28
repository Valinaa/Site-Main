<template>
    <div class="card-container">
        <div class="left-drawer-container">
            <el-drawer
                v-model="leftVisible"
                size="40%"
                direction="ltr"
                :lock-scroll="false"
                :show-close="false">
                <template #header="{ close, titleId, titleClass }">
                    <h2
                        :id="titleId"
                        :class="titleClass">
                        <b>{{ t('skills list') }}</b>
                    </h2>
                    <el-button
                        type="danger"
                        @click="close">
                        <el-icon class="el-icon--left">
                            <i-ep-circle-close-filled />
                        </el-icon>
                        {{ t('close') }}
                    </el-button>
                </template>
                <el-table
                    :data="tableData"
                    :span-method="objectSpanMethod"
                    style="width: 100%">
                    <el-table-column
                        :label="t('category')"
                        align="center"
                        width="185">
                        <template #default="{ row }">
                            {{
                                row.category === '0'
                                    ? t('programming')
                                    : row.category === '1'
                                    ? t('computers')
                                    : t('components')
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="skill"
                        :label="t('skill')"
                        align="center"
                        width="150" />
                    <el-table-column
                        :label="t('grade')"
                        width="200"
                        align="center">
                        <template #default="{ row }">
                            <el-rate
                                v-model="row.grade"
                                disabled
                                show-score
                                text-color="#ff9900" />
                        </template>
                    </el-table-column>
                </el-table>
            </el-drawer>
        </div>
        <div class="drawer-container">
            <el-drawer
                v-model="visible"
                size="25%"
                :lock-scroll="false"
                :show-close="false">
                <template #header="{ close, titleId, titleClass }">
                    <h2
                        :id="titleId"
                        :class="titleClass">
                        <b>{{ t('go where') }}</b>
                    </h2>
                    <el-button
                        type="danger"
                        @click="close">
                        <el-icon class="el-icon--left">
                            <i-ep-circle-close-filled />
                        </el-icon>
                        {{ t('close') }}
                    </el-button>
                </template>
                <el-timeline>
                    <el-timeline-item
                        center
                        type="danger">
                        <span>
                            <el-button
                                type="danger"
                                @click="
                                    () => {
                                        void router.push('/blog')
                                    }
                                ">
                                {{ t('view blog') }}
                            </el-button>
                        </span>
                    </el-timeline-item>
                    <el-timeline-item
                        type="primary"
                        hollow>
                        <span>
                            <el-button
                                type="primary"
                                @click="
                                    () => {
                                        void router.push('/muse')
                                    }
                                ">
                                {{ t('view muse') }}
                            </el-button>
                        </span>
                    </el-timeline-item>
                    <el-timeline-item
                        center
                        type="success">
                        <span>
                            <el-button
                                type="success"
                                @click="
                                    () => {
                                        void router.push('/life')
                                    }
                                ">
                                {{ t('view life') }}
                            </el-button>
                        </span>
                    </el-timeline-item>
                    <el-timeline-item
                        center
                        type="warning"
                        @click="goGitHub()">
                        <span>
                            <el-button type="warning">
                                {{ t('view github') }}
                            </el-button>
                        </span>
                    </el-timeline-item>
                </el-timeline>
            </el-drawer>
        </div>
        <el-card
            class="card"
            shadow="hover">
            <template #header>
                <div class="card-title">
                    <span style="float: left; font-size: larger">
                        {{ t('author card') }}
                    </span>
                    <el-button
                        style="float: right"
                        text
                        @click="clickHeart()">
                        <i class="card-icon">
                            <i-bx-heart :style="noClick()" />
                            <i-bxs-heart :style="hasClicked()" />
                        </i>
                        <span>{{ t('like') }}</span>
                    </el-button>
                </div>
            </template>
            <img
                src="/src/assets/avatar.jpg"
                class="card-image"
                alt="Profile Image" />
            <div class="card-content">
                <p style="font-size: xx-large; text-align: center">
                    Valinaa Chan
                </p>
                <p style="font-style: italic; text-align: right">
                    ---- {{ t('motto') }}
                </p>
                <p>
                    <i class="card-icon"><i-ph-gender-intersex-light /></i>
                    <span class="card-label">{{ t('gender') }} :</span>
                    <el-tag>{{ t('male') }}</el-tag>
                </p>
                <p>
                    <i class="card-icon"><i-mdi-numeric /></i>
                    <span class="card-label">{{ t('age') }} :</span>
                    <el-tag type="info">21</el-tag>
                </p>
                <p>
                    <i class="card-icon"><i-mdi-email-edit-outline /></i>
                    <span class="card-label">Email :</span>
                    <el-tag type="success">valinaa@valinaa-wei.tech</el-tag>
                </p>
                <p>
                    <i class="card-icon"><i-bi-phone /></i>
                    <span class="card-label">{{ t('telephone') }} :</span>
                    <el-tag type="warning">+86 18555890316</el-tag>
                </p>
                <p>
                    <i class="card-icon"><i-icon-park-outline-city-one /></i>
                    <span class="card-label">{{ t('city') }} :</span>
                    <el-tag type="success">{{ t('shanghai') }}</el-tag>
                </p>
                <p>
                    <i class="card-icon"><i-entypo-address /></i>
                    <b>{{ t('detail address') }}</b>
                </p>
                <p style="text-align: center !important">
                    <el-button
                        type="warning"
                        @click="
                            () => {
                                ElMessage.success(t('thank for read'))
                            }
                        ">
                        {{ t('read') }}
                    </el-button>
                    <el-button
                        type="danger"
                        @click="visible = true">
                        {{ t('go away') }}
                    </el-button>
                </p>
                <p style="text-align: center !important">
                    <el-button
                        type="primary"
                        @click="leftVisible = true">
                        {{ t('see skills') }}
                    </el-button>
                </p>
            </div>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ElMessage, TableColumnCtx } from 'element-plus'

interface Ability {
    category: string
    skill: string
    grade: number
}

interface SpanMethodProps {
    row: Ability
    column: TableColumnCtx<Ability>
    rowIndex: number
    columnIndex: number
}
const router = useRouter()
const { t } = useI18n()

const visible = ref(false)
const leftVisible = ref(false)
const Clicked = ref(0)
const tableData = ref([
    {
        category: '0',
        skill: 'Java & JVM',
        grade: 4.0,
    },
    {
        category: '0',
        skill: 'SQL & MySQL',
        grade: 3.7,
    },
    {
        category: '0',
        skill: 'Vue3 & Vite & etc.',
        grade: 3.3,
    },
    {
        category: '0',
        skill: 'Python',
        grade: 2.7,
    },
    {
        category: '1',
        skill: 'Operating System',
        grade: 3.0,
    },
    {
        category: '1',
        skill: 'Computer Network',
        grade: 3.4,
    },
    {
        category: '1',
        skill: 'Linux',
        grade: 3.1,
    },
    {
        category: '2',
        skill: 'Hadoop',
        grade: 3.8,
    },
    {
        category: '2',
        skill: 'Hive',
        grade: 3.4,
    },
    {
        category: '2',
        skill: 'Spark',
        grade: 3.1,
    },
    {
        category: '2',
        skill: 'ZooKeeper',
        grade: 3.0,
    },
    {
        category: '2',
        skill: 'Flume',
        grade: 3.2,
    },
    {
        category: '2',
        skill: 'Kafka',
        grade: 3.0,
    },
])

const objectSpanMethod = ({
    row,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    column,
    rowIndex,
    columnIndex,
}: // eslint-disable-next-line consistent-return
SpanMethodProps) => {
    if (columnIndex === 0) {
        // 检查前一行是否和当前行的 Category 相同
        if (
            rowIndex > 0 &&
            row.category === tableData.value[rowIndex - 1].category
        ) {
            return {
                rowspan: 0,
                colspan: 0,
            }
        }
        // 统计当前 Category 有多少个连续的行
        let rowspan = 1
        for (let i = rowIndex + 1; i < tableData.value.length; i += 1) {
            if (tableData.value[i].category === row.category) {
                rowspan += 1
            } else {
                break
            }
        }
        return {
            rowspan,
            colspan: 1,
        }
    }
}
const clickHeart = () => {
    if (Clicked.value === 1) {
        ElMessage.error(t('no repeat like'))
    } else {
        Clicked.value = 1
        ElMessage.success(t('after like'))
    }
}
const noClick = () => {
    if (Clicked.value === 0) {
        return undefined
    }
    // eslint-disable-next-line consistent-return
    return 'display:none'
}
const hasClicked = () => {
    if (Clicked.value === 0) {
        return 'display: none'
    }
    // eslint-disable-next-line consistent-return
    return undefined
}
const goGitHub = () => {
    window.open('https://github.com/Valinaa')
}
</script>
<style scoped>
.left-drawer-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
}

.drawer-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
}

.card-container {
    display: flex;
    justify-content: center;
    width: 500px;
    margin: 0 auto;
}

.card {
    width: auto;
}

.card-label {
    display: inline-block;
    width: 75px;
    padding-right: 10px;
    text-align: right;
}

p {
    padding-top: 5px;
    text-align: left;
}

.card-icon {
    padding-top: 1px;
}

.card-title {
    padding: 15px 0;
    text-align: center;
}

.card-image {
    width: 100%;
}

.card-content {
    padding: 20px;
}

.el-rate {
    --el-rate-fill-color: #2708ff;
}
</style>
