<?php

// 目标服务器的地址
$targetUrl = 'https://jsonapi.travacocro.com/';

// 获取请求的 URL
$requestUrl = $_SERVER['REQUEST_URI'];

// 构建代理 URL
$proxyUrl = $targetUrl . $requestUrl;

// 创建 cURL 请求
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $proxyUrl);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// 执行请求并获取响应
$response = curl_exec($ch);

// 获取响应的 HTTP 状态码
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// 检查是否有错误发生
if ($response === false) {
    // 输出错误信息
    echo 'Error: ' . curl_error($ch);
} else {
    // 设置响应的 HTTP 状态码
    http_response_code($httpStatus);
    
    // 输出响应内容
    echo $response;
}

// 关闭 cURL 资源
curl_close($ch);
