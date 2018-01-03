<?php
$txt = "hello";
// 以下的邮箱地址改成你的
$mail = '137847127@qq.com';
// 发送邮件
mail($mail, "My subject", $txt);
echo 'message was sent!';
?>