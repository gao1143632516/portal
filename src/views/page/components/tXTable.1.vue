<template>
    <div class="components-container">
        <el-table :data="data" v-loading.body="loading" element-loading-text="拼命加载中" border fit highlight-current-row>
            <el-table-column v-for="col of metadata.cols" :key="col.name" :label="col.label" :prop="col.field" :width="col.width" :sortable="col.sortable">
            </el-table-column>
        </el-table>
        <div v-if="metadata.pageable" v-show="!loading" class="pagination-container">
            <el-pagination @size-change="handlePageSizeChange" @current-change="handlePageIndexChange" :current-page.sync="page.pageindex" :page-sizes="[10,20,30, 50]" :page-size="page.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
// import { fetchData, fetchMetadata } from '@/api/xtable'

export default {
    props: {
        componentId: {
            type: String
        },
        metadata: {
            type: Object
        }
    },
    data() {
        return {
            action_id: 1,
            query: {
            },
            page: {
                total: 0,
                pageindex: 1,
                pagesize: 10,
            },
            // metadata: {},
            data: null,
            loading: true
        }
    },

    created() {
        // var a = this.$router.currentRoute;
        // // debugger;
        // this.action_id = a.path.slice(-1);
        // this.getMetadata()
    },
    methods: {
        getData() {
            this.loading = true;
            // var q = this.query || {};
            // q.action_id = this.action_id;
            fetchData({
                ...this.query,
                page_id: this.action_id,
                page_number: this.page.pageindex,
                page_size: this.page.pagesize
            }).then(response => {
                this.data = response.datalist;
                this.page = response.page;
                this.loading = false;
            })
        },
        getMetadata() {
            this.loading = true;
            fetchMetadata({ page_id: this.action_id }).then(response => {
                // debugger;
                this.metadata = response.data;
                this.loading = false;
                this.getData();
            })
        },
        handlePageSizeChange(val) {
            this.page.pagesize = val;
            this.getData();
        },
        handlePageIndexChange(val) {
            this.page.pageindex = val;
            this.getData();
        },
    }
}
</script>
