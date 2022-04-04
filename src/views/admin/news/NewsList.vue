<template>
  <div>
    <el-tabs type="card" v-model="tab">
      <el-tab-pane label="我发布的新闻" name="me">
        <div>
          <el-table :data="newsData" stripe style="width: 100%"
                    :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="date" label="发布时间" width="180" sortable />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="author" label="作者" width="150" sortable/>
            <el-table-column prop="" label="状态" width="100">
              <template #default="scope">
                <el-tag @click="s(scope)">审核通过</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="140">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="所有新闻" name="all">
        <div>
          <el-table :data="allNewsData" stripe style="width: 100%"
                    :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="date" label="发布时间" width="180" sortable />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="author" label="作者" width="150" sortable/>
            <el-table-column prop="" label="状态" width="100">
              <template #default="scope">
                <el-tag @click="s(scope)">审核通过</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="140">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "NewsListView",
  data() {
    return {
      tab: "me",
      newsData: [
        {
          date: '2022/01/10 12:14:12',
          author: 'test',
          title: 'test'
        }
      ],
      allNewsData: []
    }
  },
  methods: {
    switchTabMethod(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

</style>