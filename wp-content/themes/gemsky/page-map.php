<?php get_header(); ?>

<div id="map" class=" " >



</div>

<style>
    .anchorBL{
        display: none;
    }
</style>
<script>

        var documentHeight = document.body.offsetHeight
        setDomHeight($('#map'),documentHeight-40)

</script>
<script src="http://api.map.baidu.com/api?v=2.0&ak=HrbZHNlFjqQGsi402y1MnRLLqT4SDMQ5"></script>
<script src=<?php echo $_SERVER['proxy'] . '/static/echart/echarts.min.js' ?>></script>
<script src=<?php echo $_SERVER['proxy'] . '/static/echart/bmap.min.js' ?>></script>
<script src=<?php echo $_SERVER['proxy'] . '/static/echart/example.js' ?>></script>


<?php get_footer(); ?>
