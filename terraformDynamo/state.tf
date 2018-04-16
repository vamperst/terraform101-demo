terraform {
  backend "s3" {
    bucket = "serverless-talk-state"
    key    = "terraform101"
    region = "us-east-1"
  }
}
