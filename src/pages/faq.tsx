import { Card, Divider, PageHeader, Typography } from 'antd';
import { Link, history } from 'umi';
const { Title, Paragraph } = Typography;
const Faq = () => {
  return (
    <PageHeader title="常见问题" onBack={() => history.goBack()}>
      <Card>
        <Title level={4}>使用说明</Title>
        <Title level={4}>我该点评哪些课程？写一些什么？</Title>
        <Paragraph>
          所有的课程，但如果你想帮忙（谢谢！），最好的是那些
          <strong>还没有点评的课程和老师</strong>
          。请不要吝啬你的好评，也不要害怕说坏话。
          <br />
          即使是没有什么亮点的课程也值得你来写一条点评，因为“这门课很正常”也是很重要的信息。寥寥几字可以拯救无数人的迷茫。
          <br />
          <br />
          平台鼓励大家在写点评的时候各显神通，当然一个理想的点评应该
        </Paragraph>
        <ul>
          <li>
            <strong>饱含事实。</strong>
            &quot;A课很无聊&quot;不是个好的点评，&quot;A课的老师是PPTReader&quot;还可以，&quot;A课的老师会把PPT上的公式都读一遍，一字不差&quot;就非常赞了。
          </li>
          <li>
            <strong>全面。</strong>
            笔者上过一门课，老师讲台上声音小，讲得很紧张，但课下去问讲的paper，老师带我到办公室，用小黑板把paper全讲了一遍。虽然这门课在课堂上不一定好，但在这门课上遇到这位老师，我的收益是巨大的。课堂、考试、作业、课下这些维度和故事都有涉及会很赞。
          </li>
        </ul>
        <Paragraph>此外适当的幽默是最好的，不过请尊重事实。</Paragraph>
        <Title level={4}>
          这一切是关于找到&quot;水课&quot;的吗？这是否会伤害教学质量？
        </Title>
        <Paragraph>
          这不是本站的主题。我们希望的是提供完全信息，方便同学们了解这门课的风格，工作量与历史。不是哪些课容易得99。
          <br />
          我们相信来自广大同学的监督和信息的交换可以带来更大的教学质量提升。这就是为什么我们弱化1-5星的&quot;同意&quot;&quot;不同意&quot;评分而是主张文字内容。
        </Paragraph>
        <Title level={4}>我喜欢看1-5评分的数据，不喜欢看字。</Title>
        <Paragraph>
          数据本身是个伪命题。每个同学对于一门课是否推荐，工作量是否大的判断标准不一样，用数字衡量看似很客观，实际上主观得很。
          <br />
          文字可以透露实质的信息，比如&quot;这门课一周两次手写C代码作业&quot;，但是给分极好，按1-10评分，可能这门课能登水课榜首，但这也会坑很多人。
          <br />
          当然数据会让信息更好索引和浏览，因此在统计上合理的条件下，我们会提供一些统计数据。我们在努力达到一个平衡。
        </Paragraph>
        <Title level={4}>请特别注意，&quot;数据&quot;会给人错误的信心</Title>
        <Paragraph>
          我们通常喜欢相信数字。但请注意，本站上的数字是完全&quot;人造&quot;的。
          <strong>点评中填写的成绩是自由填写的</strong>
          ，从而不一定真实、准确或者有任何参考意义。因而除了随便看一眼，它们几乎没有意义。
          <br />
          课程评价的分数就更加主观了，请参见上一个问题的答案。
          <strong>因此，我们再次着重强调，数据会骗人。</strong>
          内容才是这个网站存在的核心。
        </Paragraph>
        <Divider></Divider>
        <Title level={3}>基本原则</Title>
        <Title level={4}>本站由谁来管理？</Title>
        <Paragraph>
          上海交通大学在校（或/与曾经在校）生，包括创始者和一些其他合作人。
          <br />
          我们会确保此站的管理者中至少有一人为目前的在校生。具体的机制会在创始者都毕业后决定。
        </Paragraph>
        <Title level={4}>
          本站是否由 SJTU-Plus 管理，或属于 SJTU-Plus 的一部分？
        </Title>
        <Paragraph>
          不，也不是。但 SJTU-Plus 在适当的场合有权代表本站，SJTU-Plus
          的程序员也在一定的条件下向我们提供代码。
          <br />
          但本站与任何学校机构毫无关联，任何外界机构无权干涉本站的运营。
        </Paragraph>
        <Title level={4}>网站上的内容是否受管理？</Title>
        <Paragraph>
          秉承着完全信息原则，我们不对网站上的<strong>课程点评</strong>
          进行审核、
          <strong>修改</strong>，也<strong>不对内容的真实性进行评价</strong>。
          <br />
          这不意味着我们对内容完全不加管理。我们不希望列举过多的规则
          （因为创建者相信&quot;无为而治&quot;），但以下内容本平台不予接受：
        </Paragraph>
        <ul>
          <li>
            非课程点评信息。（请自行酌情判断。对W院A课程中顺带说一句
            &quot;不得不说W院的培养方案烂的很&quot;和全文内容
            &quot;W院就是个垃圾&quot;有本质区别。）
          </li>
          <li>
            伪装成&quot;课程点评&quot;，实质对他人利益侵害的信息。比如：
            暴露没有必要的人物隐私（&quot;xxx老师不来上课，
            去yyy地zzz&quot;）、与课程内容无关的诽谤（&quot;xxx老师总是个醉汉&quot;
            不被接受，但是&quot;xxx老师上课迷迷糊糊，偶尔来晚&quot;可以）。
            对于可能牵扯到当事人侵犯法律法规的内容，若与课程无关请避免涉及，
            若与课程有关建议报送公安机关。
          </li>
          <li>
            与事实不符，经本人/他人举报并举证查实的内容会被删改，
            但是我们尽量不利用此条。如果您认为其他点评对事实有偏颇，
            欢迎自己提交点评反驳。
          </li>
        </ul>
        <Paragraph>
          原则上我们不修改内容，只修正事实性错误
          （拼写错误的老师姓名、归档错误的课程名称、学期等）。
        </Paragraph>
        <Title level={4}>网站上的内容版权问题如何界定？</Title>
        <Paragraph>
          向本站提交点评时，您同意向本站提供对您提交的点评内容的永久的
          （perpetual）、不可撤回的（irrevocable）、非独占的（non-exclusive）、
          全球有效的（worldwide）无限制的许可（license）。
          您依然享有您提交的内容的全部版权。
        </Paragraph>
        <Paragraph>
          任何人（除了原始所有权人）不得在未经许可的条件下，转载本站内容
          （包括全部或部分内容）。
        </Paragraph>
        <Paragraph>
          您在本站提交点评时，授权本站以一切法律、技术途径代理保护您所提交的内容的版权，包括但不限于向任何未经许可的转载媒介进行起诉和发送DMCA请求。
        </Paragraph>
        <Divider></Divider>
        <Title level={3}>其他事项</Title>
        <Title level={4}>如何联系你们？</Title>
        <Paragraph>
          请通过<Link to="/report">这个链接</Link>
          向平台提出意见和建议，如果希望得到私下的回复， 请留下你的联系方式。
        </Paragraph>
        <Title level={4}>我是课程老师…</Title>
        <ul>
          <li>
            <strong>…我希望回复某一个关于我的点评。</strong>
            感谢您的重视，我们随时欢迎老师也参与点评平台。请通过
            <Link to="/report">反馈提交表</Link>
            联系平台申诉并附上学校邮箱联系方式、希望回复的点评和您的回复。确认身份后我们可以将您的回复与点评一起呈现。
            <br />
          </li>
          <li>
            <strong>…我认为课程点评中存在虚假内容。</strong>请通过
            <Link to="/report">反馈提交表</Link>
            联系平台申诉并附上学校邮箱联系方式。我们希望能够协助您澄清。
          </li>
        </ul>
      </Card>
    </PageHeader>
  );
};
export default Faq;
