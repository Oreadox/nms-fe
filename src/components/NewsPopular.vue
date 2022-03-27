<template>
<div>
  <el-table :data="popular" style="width: 100%">
    <el-table-column prop="name" label="最热门" />
  </el-table>
  <p style="margin: 10px"/>
  <el-table :data="guess" style="width: 100%">
      <el-table-column prop="name" label="猜你喜欢" />
  </el-table>
</div>
</template>

<script>
export default {
  name: "NewsPopularComponents",
  data() {
    return {
      popular: [
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
      ],
      guess: [
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
        {
          no: 1,
          name: '停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进',
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>