<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage, TabsPaneContext } from 'element-plus'

const otherLoginMap = [
  {
    label: 'QQ',
    icon: 'QQ1'
  },
  {
    label: '微信',
    icon: 'shejiaotubiao-01'
  },
  {
    label: '支付宝',
    icon: 'zhifubao'
  },
  {
    label: 'GitHub',
    icon: 'github1'
  }
]

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const rememberPassword = ref(false)
    const currPane = ref('account')
    const handleTabClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
    const handleLogin = () => {
      //1.不传参写法
      router.push('/home')
      //2.传参写法
      // router.push({
      //   path: '',
      //   query: {
      //     mode: 'detail'
      //   }
      // })
      ElMessage.success('登录成功')
    }
    const getLoginType = () => {
      return (
        <div>
          {currPane.value === 'account' ? (
            <el-form ref="accountForm">
              <el-form-item>
                <el-input
                  size="large"
                  placeholder="请输入您的账号"
                  prefix-icon={() => (
                    <el-icon>
                      <User />
                    </el-icon>
                  )}
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  size="large"
                  placeholder="请输入您的密码"
                  prefix-icon={() => (
                    <el-icon>
                      <Lock />
                    </el-icon>
                  )}
                  suffix-icon={() => (
                    <span style="margin-right: 45px;color:#3e6bff;">忘记密码？</span>
                  )}
                  show-password
                />
              </el-form-item>
            </el-form>
          ) : (
            <el-form ref="phoneForm">
              <el-form-item>
                <el-input
                  size="large"
                  placeholder="请输入您的手机号"
                  prefix-icon={() => (
                    <el-icon>
                      <User />
                    </el-icon>
                  )}
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  size="large"
                  placeholder="请输入您的验证码"
                  prefix-icon={() => (
                    <el-icon>
                      <User />
                    </el-icon>
                  )}
                />
              </el-form-item>
            </el-form>
          )}
          <div class="Login-form_remeber">
            {currPane.value === 'account' && (
              <el-checkbox v-model={rememberPassword.value}>记住账号密码</el-checkbox>
            )}
            <a>注册账户</a>
          </div>
          <el-button
            onClick={() => {
              handleLogin()
            }}
            type="primary"
            style="width: 100%;"
          >
            登录11111
          </el-button>
        </div>
      )
    }
    return () => (
      <div class="Login">
        <div class="Login-form">
          <h5 class="Login-form_title">欢迎来到GIS可视化平台</h5>
          <el-tabs v-model={currPane.value} onTabClick={handleTabClick}>
            <el-tab-pane label="账号密码" name="account">
              {getLoginType()}
            </el-tab-pane>
            <el-tab-pane label="手机验证码" name="phone">
              {getLoginType()}
            </el-tab-pane>
          </el-tabs>
          <div class="Login-form_otherway">
            <el-divider>其他登录方式</el-divider>
            <div class="icons">
              {
                // otherLoginMap.map(otherItem => {
                //   return (<i class={`iconfont icon-${otherItem.icon}`} style="font-size:36px;"></i>)
                // })
                otherLoginMap.map((otherItem) => {
                  return (
                    <svg class="icon" style="font-size: 36px;" aria-hidden="true">
                      <use xlinkHref={`#icon-${otherItem.icon}`}></use>
                    </svg>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.Login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/loginBg.jpg');
  background-size: 100% 100%;
  &-form {
    // width: 400px;
    // height: 400px;
    width: 35%;
    height: 65%;
    padding: 20px;
    font-size: 22px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 15%;
    left: 5%;
    box-shadow: 0 0 55px 0 #dbdef6;
    &_title {
      text-align: left;
      font-weight: 600px;
      margin-bottom: 10px;
    }
    &_remeber {
      height: 32px;
      a {
        font-size: 14px;
        text-decoration: none;
        float: right;
        height: 32px;
        line-height: 32px;
      }
      margin-bottom: 10px;
    }
    &_otherway {
      .icons {
        padding: 0 20px;
        @include fj(space-between, center);
      }
    }
  }
}
:deep(.el-tabs__nav-wrap::after) {
  height: 0;
}
</style>
