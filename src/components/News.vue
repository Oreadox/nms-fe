<template>
  <div class="div">
    <div v-for="i1 of list1" :key="i1" style="margin: 0 0 10px 0">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>停课不停学，梦想不延期 ——数学与计算机学院线上教学工作稳步推进</span>
            <el-button class="button" type="text">编辑这条新闻</el-button>
          </div>
        </template>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疫情却再次来袭英雄城。鉴于南昌市疫情防控形势复杂严峻，为最大限度确保广大师生身体健康和生命安全，根据学校发布的《疫情防控期间本科生教学安排的紧急通知》，我院立即响应，多方统筹，科学谋划，充分发挥学院学科特色资源，迅速将全院教学工作由线下全面转至线上。
          3月20日起，全院启动教师线上教学、居家办公的紧急预案。我院着力保障教育教学教研质量，指导并要求“两系一中心”制定灵活多样、实效性强的具体实施方案，做到“一系一案”“一级一案”“一课一案”，最大限度减少本次疫情对学生学习生活的影响。</div>

      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewsComponents",
  data(){
    return {
      i: '',
      list1: [1,2,3,4,5,6,7]
    }
  }
}
</script>

<style scoped>
.div{
  width: 100%;
  margin: 10px 30px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
</style>