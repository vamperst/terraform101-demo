resource "aws_elb" "web" {
  name = "example-elb"

  subnets = ["${aws_subnet.tf_test_subnet.id}"]

  security_groups = ["${aws_security_group.elb.id}"]

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:80/"
    interval            = 30
  }

  instances                   = ["${aws_instance.web.id}", "${aws_instance.web-2.id}"]
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400
}

resource "aws_lb_cookie_stickiness_policy" "default" {
  name                     = "lbpolicy"
  load_balancer            = "${aws_elb.web.id}"
  lb_port                  = 80
  cookie_expiration_period = 600
}

resource "aws_instance" "web" {
  instance_type = "t2.micro"

  ami = "${lookup(var.aws_amis, var.aws_region)}"

  key_name = "${var.key_name}"

  vpc_security_group_ids = ["${aws_security_group.default.id}"]
  subnet_id              = "${aws_subnet.tf_test_subnet.id}"

  connection {
    user        = "ubuntu"
    private_key = "${file("${var.key_path}")}"
  }

  provisioner "remote-exec" {
    scripts = [
      "${path.module}/installNginx.sh",
    ]
  }

  provisioner "file" {
    source      = "${path.module}/front"
    destination = "/home/ubuntu/front/"
  }

  provisioner "remote-exec" {
    scripts = [
      "${path.module}/moveFIles.sh",
    ]
  }

  tags {
    Name = "elb-example"
  }
}

resource "aws_instance" "web-2" {
  instance_type = "t2.micro"

  ami = "${lookup(var.aws_amis, var.aws_region)}"

  key_name = "${var.key_name}"

  vpc_security_group_ids = ["${aws_security_group.default.id}"]
  subnet_id              = "${aws_subnet.tf_test_subnet.id}"

  connection {
    user        = "ubuntu"
    private_key = "${file("${var.key_path}")}"
  }

  provisioner "remote-exec" {
    scripts = [
      "${path.module}/installNginx.sh",
    ]
  }

  provisioner "file" {
    source      = "${path.module}/front"
    destination = "/home/ubuntu/front/"
  }

  provisioner "remote-exec" {
    scripts = [
      "${path.module}/moveFIles.sh",
    ]
  }

  #Instance tags
  tags {
    Name = "elb-example-2"
  }
}
