<template>
	<div>
		<!--头部提示信息-->
		<header class="top_tips">
			<span class="tips_num">题目{{questionNum}}</span>
		</header>
		<!--中间的item，也就是答题部分-->
		<div>
			<div class="question_container common_middle">
				<div class="qutesiton_content">
					<!--题干信息-->
					<header class="question_title">{{questionList[questionNum-1].topic_name}}</header>
					<!--选项信息-->
					<ul class="answer_list">                   <!-- 添加点击事件，控制 -->
						<li class="answer_list_item" v-for="(item,index) in questionList[questionNum-1].topic_answer " @click="chooseItem(index,item.topic_answer_id)">
							
							
							<!--ABCD-->
							<!---->                      <!-- 判断正确答案==我的答案 为黄 -->     <!-- index是实参 -->
							<span class="choose_num" :class="{choosed_num:index==myanswer}">{{hanlder(index)}}</span><!-- 控制ABCD的颜色 -->
							<!--选项-->
							<span class="answer_detail">{{item.answer_name}}</span>
						</li>
						</ul>
				</div>
			</div>
			<div class="next_question common_button_style" v-if="questionNum < questionList.length" @click="next"></div><!-- 下一题 -->
			<div class="common_button_style submit" v-else @click="submitHanlder"></div><!-- 控制提交按钮 -->
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				questionNum:this.$store.state.questionNum,
				questionList:this.$store.state.questionList,
				myanswer:null,
				myanswerId:null
				
			}
		},
		methods:{
			//index是下标   hanlder判断显示ABCD
			hanlder:function(index){
				if(index==0){
					return 'A'
				}else if(index==1){
					return 'B'
				}else if(index==2){
					return 'C'
				}else{
					return 'D'
				}
			},
			chooseItem:function(index,id){
				//决定是否变黄
				this.myanswer=index;
				//我选的答案id
				this.myanswerId=id;
			},
			 next:function(){					//控制下一题
				if(this.myanswer == null){
					alert("没有选题");
				}else{
					this.questionNum++;
					this.myanswer=null;
					//分发action调用store里面的action
					this.$store.dispatch("saveMyAnswer",this.myanswerId);//dispatch触发action，把saveMyAnswer传给
				}
			},
			submitHanlder:function(){
				if (this.myanswer==null) {
					alert("没有选题");
				}else{
					this.$router.push("/score");
					this.$store.dispatch("saveMyAnswer",this.myanswerId);
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	/*头部提示开始*/
	
	.top_tips {
		width: 4rem;
		height: 6rem;
		background: url(../assets/WechatIMG2.png) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		right: 1.5rem;
		.tips_num {
			font-size: 0.65rem;
			display: inline-block;
			width: 3.8rem;
			height: 1.4rem;
			position: absolute;
			top: 4.2rem;
			text-align: center;
			line-height: 1.4rem;
			color: #9F9164;
			font-weight: lighter;
		}
	}
	/*头部提示结束*/
	
	.common_middle {
		width: 12rem;
		height: 10rem;
		position: absolute;
		top: 6rem;
		left: 50%;
		margin-left: -6rem;
	}
	/*答题部分开始*/
	
	.question_container {
		background: url(../assets/2-1.png) no-repeat;
		background-size: 100% 100%;
		.question_title {
			font-size: 0.65rem;
			width: 8rem;
			position: absolute;
			top: 2rem;
			left: 2.5rem;
		}
		.answer_list {
			position: absolute;
			top: 3rem;
			left: 2.5rem;
			.choose_num {
				font-size: 0.6rem;
				display: inline-block;
				border: 1px solid gray;
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 50%;
				text-align: center;
				line-height: 0.8rem;
			}
			.choosed_num {
				border: 1px solid yellow;
				background-color: yellow;
				color: black;
			}
			.answer_detail {
				font-size: 0.6rem;
			}
		}
	}
	
	.common_button_style {
		position: absolute;
		top: 16rem;
		left: 50%;
		margin-left: -2rem;
		width: 4rem;
		height: 2rem;
	}
	
	.next_question {
		background: url(../assets/2-2.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.submit {
		background: url(../assets/3-1.png) no-repeat;
		background-size: 100% 100%;
	}
	/*答题部分结束*/
</style>